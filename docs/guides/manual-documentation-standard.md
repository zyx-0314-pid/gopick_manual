# Manual Documentation Standard V2

This guide defines the updated documentation structure for GoPick manual pages.

The purpose of V2 is to ensure manuals:
- follow actual website navigation and workflows
- mirror real UI traversal and operational usage
- reduce redundancy
- separate workflow documentation from domain/governance analysis
- avoid inferred or assumed system behavior

---

# Core Documentation Principle

Manual pages must always follow:

```text
actual website behavior and navigation flow
```

Documentation must NOT:
- invent workflows
- invent page access paths
- invent UI placement
- flatten unrelated workflows together
- infer hidden behavior not visible in the system

If behavior is not directly confirmed from:
- UI
- navigation
- actual workflow
- observed operation

then it should not appear in the workflow manual.

---

# V2 Documentation Layers

## 1. Workflow Manual Layer

Purpose:
- Document how users navigate and operate the website

Audience:
- QA
- Support
- Operations
- Non-technical users
- Developers needing workflow reference

File Examples:
```text
docs/workflow/meters-management.md
docs/workflow/reports-management.md
docs/workflow/candidate-management.md
```

Structure follows:
```text
Module
→ Page
→ Row Action
→ Nested Action
→ Result
```

Workflow manuals must mirror:
- actual pages
- actual row actions
- actual nested navigation
- actual access paths

---

## 2. Domain Governance Layer

Purpose:
- Document confirmed operational/system behavior

Audience:
- Developers
- Architects
- QA Leads
- System Analysts

File Examples:
```text
docs/domain-governance/meters.md
docs/domain-governance/reports.md
```

Contains:
- hierarchy behavior
- authority behavior
- visibility behavior
- balance behavior
- audit behavior
- operational constraints

Does NOT describe:
- UI traversal
- user navigation flow

---

## 3. Gap Registry Layer

Purpose:
- Track unresolved behavior and discovered inconsistencies

Audience:
- Developers
- QA
- Product Owners
- Architects

File Examples:
```text
docs/known-gaps/meters-gap-registry.md
```

Contains:
- undefined behavior
- staging discoveries
- operational ambiguities
- unresolved validations
- pending clarifications

---

# Workflow Manual Structure

Workflow manuals should follow:

```md
# Module Name

## Main Page / Feature

### Action / Workflow

### Access Path
- Actual page navigation path

### How To Use

1. Actual UI action.
2. Actual UI action.

> Rules:
> - Confirmed validation or restriction.

> Expected Result:
> - Confirmed visible outcome.
```

---

# Access Path Rules

Every workflow should follow actual:
- menu navigation
- page access
- row action access
- modal access
- nested workflow access

Example:

```md
### Access Paths
- `Meters` > `Transfer Meters`
- `Meters` > `Meter Records` > `View Meter` > `Transfer Meter`
```

If multiple valid entry points exist:
- document all confirmed access paths
- avoid duplicating workflow explanations unnecessarily

---

# Layering Rules

Workflow hierarchy should follow actual UI structure.

Example:

```text
Meters Module
├── Meter Request
├── Order Meters
├── Transfer Meters
├── Meter Records
│   ├── View Meter
│   │   ├── Transfer Meter
│   │   └── View Meter Log
│   ├── View Meter Log
│   └── Update Meter Balance
```

Do NOT flatten unrelated workflows into:
- abstract capability groups
- domain-only categories

---

# Redundancy Rules

Avoid repeating:
- same workflow explanation
- same validation explanation
- same navigation explanation

If workflows share behavior:
- reuse concise references
- avoid copy-pasting entire sections

---

# Confirmed Behavior Rule

Workflow manuals may only contain:
- confirmed UI behavior
- confirmed navigation
- confirmed operational flow
- confirmed validations visible to users

Do NOT include:
- inferred behavior
- assumed pages
- assumed workflow locations
- architecture analysis
- unresolved domain investigation

---

# Domain vs Workflow Separation

## Workflow Manual Answers

```text
How does the user navigate and use the website?
```

---

## Domain Governance Answers

```text
How does the system behave operationally?
```

---

## Gap Registry Answers

```text
What is unresolved, unclear, inconsistent, or pending clarification?
```

---

# Important V2 Principle

Workflow manuals should mirror:
```text
how the website is actually experienced by users
```

not:
```text
how developers conceptually group features internally
```

because:
- navigation hierarchy is part of operational workflow
- row actions create nested workflows
- multiple pages may connect into the same operation
- users experience the system through traversal, not domain abstractions

---

# Operational Benefits

This structure improves:
- onboarding
- QA verification
- workflow traceability
- support debugging
- navigation clarity
- manual maintainability
- reduction of hallucinated workflows
- separation of UI documentation from domain analysis