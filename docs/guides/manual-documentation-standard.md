# Manual Documentation Standard

This guide defines how GoPick manual pages should be written and rendered. The manual is the shared source of truth for IT Developers, QA, and non-technical users, so every page should explain how to use the feature, what the system enforces, and what users should expect to see.

Candidate Management is the baseline pattern because it already separates workflows, steps, rules, and system behavior in a way that can be reused by other modules.

## Audience

Each manual page must support three readers:

- IT Developers: need module behavior, validations, dependencies, permissions, and edge cases.
- QA: need repeatable test steps, expected outcomes, rules, and conditions to verify.
- Non-technical users: need plain instructions, labels to click, and simple explanations of what should happen.

Write one manual that works for all three. Avoid making separate truth for each audience unless the topic is purely technical.

## Page Structure

Use this hierarchy for module pages:

```md
# Module Name

> Legends:
> (Admin) - Super Admin IT or Super Admin ASD
> (Accounts) - Distributor, Sub Distributor, Client, Sub-Client

## Main Feature
Short purpose of the feature.

### Workflow or Subfeature
Short explanation of when this is used.

1. Step by step action.
2. Step by step action.
3. Step by step action.

> Rules:
> - System rule, validation, permission rule, display rule, or lock behavior.
> - Another system-enforced behavior.

> Expected Result:
> - What appears after completing the steps.
> - What data changes, status changes, file downloads, email sends, or logs are created.

> Notes:
> - Plain explanation, caveat, or terminology help.
```

## Required Blocks

### Steps

Steps describe what the user does in the UI.

Use steps when there is an action flow:

```md
1. Open `Candidates` > `View Candidate`.
2. Select the candidate.
3. Open `Actions` > `View Assessment`.
```

Guidelines:

- Use numbered steps for ordered actions.
- Use the exact UI label in backticks when referring to a button, menu, tab, field, icon name, or dropdown value.
- Keep one user action per step where possible.
- Use nested bullets only when a step has role-specific choices or grouped fields.
- Do not mix system rules into steps. Put rules in the Rules block.

### Rules

Rules are system behavior that IT Developers and QA must treat as truth.

Use a Rules block for:

- Required field validation.
- Permission and RBAC behavior.
- Locking or disabled states.
- Display logic.
- Data relationship behavior.
- Server-side validation.
- Meter deduction, transfer, and log rules.
- Report availability and generation rules.

Rules should render as the yellow callout used in the manual UI.

```md
> Rules:
> - Account Type can only be lower than the current account type.
> - Password and Confirm Password should match.
```

Rules should not become their own sidebar section unless the whole feature is about rules, such as RBAC Matrix or Account Hierarchy.

### Expected Result

Expected Result explains what QA and non-technical users should see after the steps.

Use it for:

- Screen changes.
- Table rows appearing or updating.
- File downloads.
- Emails being sent.
- Status changes.
- Meter balance changes.
- Log creation.
- Disabled/enabled buttons or icons.

Example:

```md
> Expected Result:
> - The selected report downloads for candidates with generated reports.
> - Candidates without available reports are skipped or remain unavailable based on the system behavior.
```

### Notes

Notes explain context, terminology, or caveats. Use Notes for helpful explanations that are not strict system rules.

```md
> Notes:
> - Test Battery means a group of assessments bundled together.
> - A single assessment appears as one standalone assessment item.
```

## Candidate Management Baseline

Candidate Management is the preferred model for current and future pages because it has:

- Legends for role shorthand.
- Main workflows like Schedule Candidate and View Candidates.
- Subsections for specific actions.
- Ordered steps for repeatable flows.
- Rules callouts for validations and locking behavior.
- Plain descriptions before steps.

When updating other pages, align them to this pattern.

### Candidate Pattern Example

```md
## View Candidates

### View Assessments
View the assessments assigned to a candidate.

1. Open `Candidates` > `View Candidate`.
2. Select the candidate.
   - (Admin) Select Distributor Account, then select the candidate.
   - (Accounts) Select the candidate directly.
3. Open `Actions` > `View Assessment`.

> Rules:
> - Each single assessment is rendered as a standalone row.
> - Test batteries are represented by listing their associated single assessments with a tag.

> Expected Result:
> - The candidate assessment list opens.
> - Single assessments and test battery assessments display according to the rules above.
```

## UI And Layout Alignment

Manual pages should use one consistent visual language.

### Page Shell

Each rendered manual page should have:

- Same header and footer as existing manual pages.
- Page title and short description at the top.
- Left aside for page navigation on desktop.
- Mobile aside drawer behavior through the shared manual navigation script.
- Main content in one white content surface with the same spacing and typography.

### Sidebar

The aside should represent the document hierarchy:

- `##` sections are top-level sidebar items.
- `###` and deeper sections may appear nested under their parent.
- Rules, Expected Result, and Notes should not normally appear as sidebar items.
- The active branch should expand like Candidate Management and Meters Management.

### Content Blocks

Use consistent block styling:

- Steps: numbered step cards or clearly spaced ordered lists.
- Rules: yellow/amber callout with title `Rules` and bullet list.
- Expected Result: separate callout or visually distinct block titled `Expected Result`.
- Notes: lighter informational block or simple paragraph under `Notes`.

## Writing Rules

Use plain, stable wording:

- Prefer `Select` or `Open` for UI actions.
- Prefer `Click` only when the action is specifically a button press.
- Use `required`, `autofill`, `disabled`, `locked`, and `available` consistently.
- Use singular/plural carefully: `assessment`, `assessments`, `report`, `reports`.
- Avoid vague text like `etc.` when QA needs to know what to verify.
- Avoid only saying `able to`; explain the action and result.

Preferred wording examples:

- Instead of: `Able to Email Assessments Reports to Specific Users`
- Use: `Send assessment reports to selected recipients.`

- Instead of: `View Details of meters of the account`
- Use: `View the meter balance and meter details for the selected account.`

## When To Use Technical Names

Technical names such as `modCandidates`, `modUsage`, or RBAC action names are useful for IT Developers, but they should be labeled clearly.

Use this format:

```md
> Technical Reference:
> - Module: `modCandidates`
> - Related action: `modAssessmentSchedule-actionCreate`
```

Do not place technical names in the user step unless the UI actually shows that technical name.

## Non-Technical Version

For non-technical readers, the same feature should be understandable without module names or internal logic. Use this simplified pattern:

```md
## Feature Name
What this feature is for in one sentence.

### How To Use
1. Go to the page.
2. Choose the record or option.
3. Click the action.

> Important Rules:
> - What must be true before this works.
> - What the system will not allow.

> What To Expect:
> - What the user sees after the action.
> - What changes after saving, sending, downloading, or approving.
```

### Non-Technical Example

```md
## Download Reports
Download generated assessment reports from the Usage page.

### How To Use
1. Open `Report` > `Search Usage`.
2. Select the assessments or candidates.
3. In `Bulk Action`, select `Download Report`.

> Important Rules:
> - Reports are available only after the assessment is completed and the report has been generated.
> - Group assessments show the Test Battery name above the sub-assessment name.

> What To Expect:
> - Available reports download to your computer.
> - Assessments without generated reports will not have a downloadable report yet.
```

## Review Checklist

Before a page is considered aligned, check the following:

- The page has a clear module title and short purpose.
- Major features use the same heading hierarchy as Candidate Management.
- User actions are written as numbered steps.
- Rules are in a Rules callout, not mixed into steps.
- Expected results are documented for workflows that save, send, download, approve, reject, transfer, or update data.
- Technical terms are explained or placed in a Technical Reference block.
- The sidebar follows the content hierarchy and does not include callout-only blocks.
- The page can be understood by QA and non-technical readers without asking a developer to explain the flow.
