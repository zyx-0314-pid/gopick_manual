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