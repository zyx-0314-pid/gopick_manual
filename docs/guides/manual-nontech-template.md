# Non-Technical Manual Template

Use this template when documenting a feature for readers who do not need internal module names or developer details.

The goal is simple: explain what the feature is for, how to use it, what rules apply, and what the user should expect after the action.

```md
# Module Name

## Feature Name
Short explanation of what this feature is for.

### How To Use
1. Open `Menu` > `Page`.
2. Select the record, account, candidate, assessment, or report.
3. Fill in the required fields.
4. Click `Save`, `Send`, `Download`, `Approve`, or the correct action.

> Important Rules:
> - Rule that the user must follow.
> - Rule that the system enforces.
> - Condition that makes an action unavailable.

> What To Expect:
> - What appears on screen.
> - What changes after the action.
> - What file, email, report, status, or log is created.

> Notes:
> - Simple explanation of terms or special cases.
```

## Example: Reports

```md
# Reports Module

## Search Usage
Search and review assessment usage records, including candidate, company, assessment, schedule date, scheduler, and assessment status.

> Important Rules:
> - Group Assessment/Test Battery shows the Test Battery name above the sub-assessment name.
> - Single Assessment shows only the assessment name.

> What To Expect:
> - Usage records appear in the table based on the search or filters used.
> - The Assessment column follows the display rules above.

### Download Reports
Download available assessment reports for selected candidates and assessments.

1. Open `Report` > `Search Usage`.
2. Select the assessments or candidates.
3. In `Bulk Action`, select `Download Report`.

> Important Rules:
> - Reports are available only when a generated report exists.
>
> What To Expect:
> - Available reports download to your computer.
> - If a report is not generated yet, it will not be available for download.
```

## Example: Meters

```md
# Meters Module

## Transfer Meters
Transfer meter balance from one account to a child account.

### How To Use
1. Open `Meters` > `Transfer Meter`.
2. Select `Source Account`.
3. Check the loaded `Available Meters`.
4. Enter the `Meter Value` to transfer.
5. Select `Destination Account`.
6. Click `Transfer Meter`.

> Important Rules:
> - The transfer value cannot be greater than the available meter balance.
> - The destination account must be allowed under the account hierarchy.
>
> What To Expect:
> - The source account meter balance decreases.
> - The destination account meter balance increases.
> - A meter log entry records the transfer.
```

## Quick Writing Checklist

- Can a non-technical user follow the steps without asking where to click?
- Are required fields clearly marked?
- Are system restrictions listed under Important Rules?
- Does the page say what happens after the action?
- Are technical module names removed or explained in plain language?
- Are labels written exactly as they appear in the UI?
