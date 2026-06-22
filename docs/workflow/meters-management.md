# Meters Module

> Legends:
> (Admin) - Super Admin IT or Super Admin ASD
> (Accounts) - Distributor, Sub Distributor, Client Account, Sub-Account

The Meters Module manages meter requests, transfers, balances, consumption history, and meter-related account operations.

---

# Meter Request

View and manage meter requests from lower hierarchy accounts.

## Approve Or Reject Request

Review pending meter requests and approve or reject the request.

### Access Path
- `Meters` > `Meter Request`

### How To Use

1. Open `Meters` > `Meter Request`.
2. Select the request.
3. Review the request details.
4. Click:
   - `Approve`
   - `Reject`

> Rules:
> - Requests require approval before meter movement occurs.
> - Request approval deducts meters from the approving account.
> - Requests may only be approved by authorized higher hierarchy accounts.
> - Requests cannot be edited after submission.
> - Partial approval is not supported.
> - Requests may be cancelled by the requester or higher hierarchy accounts.

> Expected Result:
> - The request status updates.
> - Meter balances update after approval.
> - A request history log is created.

---

# Order Meters

Request meters from higher hierarchy accounts.

### Access Path
- `Meters` > `Order Meters`

### How To Use

1. Open `Meters` > `Order Meters`.
2. Enter the requested meter value.
3. Click `Send Meter Order`.

> Rules:
> - Meter requests follow hierarchy authority rules.
> - Requests require approval before meter balances change.

> Expected Result:
> - The meter request is added to the request list.
> - Higher hierarchy accounts can review the request.

---

# Transfer Meters

Transfer meter balances to allowed accounts.

### Access Paths
- `Meters` > `Transfer Meters`
- `Meters` > `Meter Records` > `View Meter` > `Transfer Meter`

### How To Use

1. Open `Transfer Meters`.
2. Select `Source Account`.
3. Review the loaded `Available Meters`.
4. Enter the `Meter Value`.
5. Select `Destination Account`.
6. Click `Transfer Meter`.

> Rules:
> - Transfers are immediate and do not require approval.
> - Transfer amount cannot exceed the available balance.
> - Transfers cannot cause balance `< 0`.
> - Standard accounts may transfer only to descendant accounts.
> - Cross-branch transfers are restricted to Super Admins.

> Expected Result:
> - The source account balance decreases.
> - The destination account balance increases.
> - A transfer log entry is created.

---

# Meter Records

View account meter balances, logs, and meter-related actions.

### Access Path
- `Meters` > `Meter Records`

---

## View Meter

View meter balance and meter details for the selected account.

### Access Path
- `Meters` > `Meter Records` > `View Meter`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `View Meter`.

> Rules:
> - Visibility depends on account hierarchy.
> - Higher hierarchy accounts may view descendant account meters.

> Expected Result:
> - The selected account meter details are displayed.

---

## Transfer Meter

Transfer meters directly from the selected account.

### Access Path
- `Meters` > `Meter Records` > `View Meter` > `Transfer Meter`

### How To Use

1. Open `View Meter`.
2. Click `Transfer Meter`.
3. Enter transfer details.
4. Click `Transfer Meter`.

> Rules:
> - Transfer restrictions follow hierarchy authority rules.
> - Transfers cannot cause balance `< 0`.

> Expected Result:
> - Meter balances update immediately.
> - A transfer log entry is created.

---

## View Meter Log

View meter history and meter-related activities for the selected account.

### Access Paths
- `Meters` > `Meter Records` > `View Meter Log`
- `Meters` > `Meter Records` > `View Meter` > `View Meter Log`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `View Meter Log`.

> Rules:
> - Meter log visibility follows hierarchy authority.
> - Higher hierarchy accounts may view descendant logs.
> - Accounts may view their own logs.
> - Archived and deactivated account logs remain visible in history.
> - Remark rendering in `modMeterlog` is owned only by `MeterLogRemarkService`.
> - Controller and View must not implement business decisions for remark text.
> - Meter log remark lookups are handled by `MeterLogRemarkRepository` and `ApprovedMeterRequestRemarkRepository`.
> - No undeclared fallback behavior is allowed for remark resolution.

### Meter Log Remark Mapping

- `0`: `Used to Score Assessment` or `Used to Score Assessment: <account_name>`
- `1`: `Sent to <account_name>`
- `2`: `Initial Meters`
- `3`: `Received from <account_name>`
- `4`: `Received from <account_name>`
- `5`: `Sent to <account_name>`
- `6`: `Meter Balance Update`
- `7`: `Moved to Newly Created Account: <account_name>`
- `8`: `<type-change-specific-message>: <actor_account_name>`

### New Discovery And Settings-Changed Notes

Actor is the logged-in user at action time. Actor is not always the parent account.

#### Create New Account

- Remarks:
- `(Target View)`: `Initial Meters`
- `(Actor View)`: `Moved to Newly Created Account: <target_user_name>`
- Target Account:
- `(Both View)`: `<target_user_name>`
- Addition and Deduction:
- If meter type is parent deduction and allocated value is `0`: `Addition = 0`, `Deduction = 0`
- If meter type is self deduction and allocated value is `n` where `n > 0`: `Addition = n`, `Deduction = 0`

#### Update Meter Type

- Remarks:
- `(Target View)`: `Meter Type Update (switched to self/parent deduction) by: <actor_user_name>`
- `(Actor or Parent View)`: `Meter Type Update (switched to self/parent deduction): <target_user_name>`
- Target Account:
- If switched to self deduction: `(Both View) <target_user_name>`
- If switched to parent deduction: `(Both View) <parent_user_name>`
- Addition and Deduction:
- If switched to self deduction:
- `(Target View)`: `Addition = n` (target meter balance value)
- `(Actor View)`: `Deduction = n` (actor meter balance value)
- If switched to parent deduction:
- `(Target View)`: `Deduction = n` (target meter balance value)
- `(Actor View)`: `Addition = n` (actor meter balance value)

#### Update Meter Balance

- Remarks:
- `(Target View)`: `Meter Balance Update by: <actor_user_name>`
- `(Parent View)`: `Meter Balance Updated: <target_user_name>`
- Target Account:
- If deduction: `(Both View) <parent_user_name>`
- If addition: `(Both View) <target_user_name>`
- Addition and Deduction:
- If deduction:
- `(Actor View)`: `Addition = n`
- `(Target View)`: `Deduction = n`
- If addition:
- `(Actor View)`: `Deduction = n`
- `(Target View)`: `Addition = n`

#### Use Meter Balance

- Remarks:
- If own candidate: `Used to Score Assessment`
- If lower-hierarchy candidate: `Used to Score Assessment: <consumer_user_name>`
- Target Account:
- If own candidate: `<own_user_name>`
- If lower-hierarchy candidate: `<consumer_user_name>`

#### Request Meter Approved

- Remarks:
- `(Target View)`: `Received from <actor_user_name>`
- `(Actor View)`: `Sent to <target_user_name>`
- Target Account:
- `<target_user_name>`
- Addition and Deduction:
- `(Actor View)`: `Deduction = n`
- `(Target View)`: `Addition = n`

### What To Expect In Remarks

- `Used to Score Assessment`: Meter was consumed by assessment completion.
- `Used to Score Assessment: <account_name>`: Assessment consumption is attributed to the shown account.
- `Sent to <account_name>`: Meters were deducted from the current account and transferred to the shown account.
- `Received from <account_name>`: Meters were added to the current account from the shown account.
- `Initial Meters`: Starting meter balance set during account meter initialization.
- `Meter Balance Update`: Manual add/deduct adjustment from `Update Meter Balance`.
- `Moved to Newly Created Account: <account_name>`: Meters were moved to a newly created child account.
- `<type-change-specific-message>: <actor_account_name>`: Consumption-type change event; message identifies the specific type-change action and actor account.
- `(not set)`: Applicable only to unresolved `type=4` fallback output from stored/paired/parent resolution path.

### Site Behavior Expectations

- The same transaction input always resolves to one predictable remark format.
- Account names appear only when the source event can resolve a target/source account.
- For unresolved `type=0` and `type=3`, the system returns a diagnostic failure instead of silent fallback text.
- Remarks are rendered by service-owned rules; View and Controller do not alter remark meaning.

### Meter Log Remark Resolution Rules

- `type=0`: resolve consuming account from schedule linkage (`candidate_id` + `assessment_id`); unresolved returns diagnostic failure.
- `type=3`: use notes when present; else resolve paired transfer source; unresolved returns diagnostic failure.
- `type=4`: source from stored remark, paired deduction, immediate parent; unresolved returns `(not set)`.
- `type=6`: reserved for normal meter balance update only.
- `type=7`: requires explicit new-account target marker in notes and resolvable target account.
- `type=8`: requires explicit message marker in notes and resolvable actor.

> Expected Result:
> - Meter activity history is displayed.

---

## Update Meter Balance

Add or deduct meter balances for the selected account.

### Access Path
- `Meters` > `Meter Records` > `Update Meter Balance`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `Update Meter Balance`.
4. Enter the adjustment value.
5. Save the update.

> Rules:
> - Meter balances cannot become `< 0`.
> - Higher hierarchy accounts may update descendant account balances.
> - Super Admins are not meter-deducted during updates.

> Expected Result:
> - The selected account balance updates.
> - A meter adjustment log entry is created.

---

# Meter Consumption

Meters are consumed during assessment completion.

Generated reports may later be:
- Viewed
- Downloaded
- Emailed
- Revisited

without additional meter deduction.

> Rules:
> - Meter deduction occurs once per candidate per assessment.
> - Generated reports remain accessible after creation.
> - Higher hierarchy accounts may view descendant reports.

> Expected Result:
> - Meter balances decrease after assessment completion.
> - Generated reports become available for viewing and download.

---
