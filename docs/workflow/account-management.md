# Account management
## Hierarchy:
```
Super Admin (IT)
Super Admin (ASD)
└─ Distributor
   ├─ Administrator
   ├─ Self Registration
   └─ Sub Distributor
      ├─ Administrator
      ├─ Self Registration
      └─ Client
         ├─ Administrator
         └─ Sub Client
            ├─ Administrator
            └─ Self Registration
```

> Rules
> - Account Related Updates can only be modified by `Super Admin (IT/ASD)`, `Distributor` and `Sub-Distributor`

## Create Account
1. Account Information
- Account Type (required) - Distributor, Sub Distributor, Client, Sub-Account, Self-Registration
- Parent Account (required)
- Account Name (required) - Company/Organization Account Name
- Username (required)
- Password (required)
- Confirm Password (required)
- Primary Contact Name (required)
- Primary Contact Email (required)
- Country (required)
- Business Phone Number (required)
- Business Address (required)
- Billing Address (required) or Checkbox to make similar with Business Address
- Expiry date & TIme (required)
- Actual Account Expiration (required and autofill)
- Status (autofill)

> Validation Guard Rails:
> - Account Type: You can only select lower than your account type (Check [Hierarchy](#hierarchy))
> - `Password` and `Confirm Password` should match
> - `Billing Address` can be similar to `Business Address` using `checkbox toggled` or enter `manually via input` that shows up when checkbox is off

> Account Creation Limit Guard Rails:
> - Admin: Bypasses rules of creation: Limits (Found in `Other Account Settings Page`) of the account they are creating
> - Non-Admin: Are limited to the accounts they are able to create (Found in `Other Account Settings Page`)
> - Active Accounts: not deactivated, not archived, not deleted, not expired
> - Expired: Determined by `Expiry date` + `Actual Account Expiration`

---

2. Assign Products
Select Assessments that Company/Organization can use.

Assessment have the following category:
- Cognitive/Knowledge-based Assessment
- Competency-based Assessment
- Survey
- Behavioral/Personality-Based Assessment
- Test Battery, A group of Assessments bundled together

> Rules:
> - At least 1 assessment

---

3. Meter Management
Set Meter Management Type and Meter Balance

Meter Management Type: Self and Parent Based
Self = Deduct usage from this account
Parent = Deduct usage from Distributor/Sub-Distributor/Client

> Meter Management Guard Rails:
> - Distributor has only 1 Meter Management Type.
> - Self Mode: Meter balance cannot be 0.
> - Parent Mode: Parent meter balance cannot be 0.

---

4. Other Account Settings
Set additional account-related configurations:

- Set User Account limit (autofill, 99)
- Set Sub-Distributor Limit (autofill, 0)
- Set Client Limit (autofill, 0)
- Set Sub-Account Limit (autofill, 0)
- Set Self Registration Limit (autofill, 0)
- Set API Access Username
- Set HRSC Name 
- Set HRSC Email 
- Set Assessment Specialist Name
- Set Assessment Special Email
- Set Client Contact Person Name
- Set Client Usage Recipient Email
- Set Site Billing Type (Included in Package or With Site Fee)
  - Set Billing Amount (PHP)
- Contact Type:
  - Volume-based
    - Contracted Meters (Disabled)
    - Addendum (autofill, 0)
  - Per Usage
    - Base Meter (autofill, 0)

> Display & Visibility Guard Rails:
> - Sub-Distributor Limit: Appears only for Distributor accounts.
> - Client Limit: Appears only for Distributor and Sub-Distributor accounts.
> - Sub-Account Limit: Appears only for Distributor, Sub-Distributor, and Client accounts.
> - Billing Amount: Appears only when Set Site Billing Type is With Site Fee 
> 
> Data Sync Guard Rails:
> - Contracted Meters: Values are prefilled from the Meter Management section.
> - Addendum: Value is locked when the selected Meter Type is Parent.

---

5. Review Account Details
Able to review Account Information before saving

## View Accounts

1. Accounts Section > View Accounts
2. Select Account > View Account

From the View Account you can navigate to the followings:

- [Account Information](#account-information)
- [Assigned Assessments](#assigned-assessments)
- [Meter Management](#meter-management)
- [Other Account Settings](#other-account-settings)
- [List of Users](#list-of-users)

> Legends: (prioritization is from top to bottom)
> Active - Active and not yet expired
> Deactivated - Deactivated
> Expiring - Active and exceeded expiration date but not account expiration extension
> Expiring - Active, exceeded expiration date and exceeded account expiration extension

### View: Section
#### Account Information
Displays the basic account information of the user.

#### Assigned Assessments
Lists all assessments assigned to the account, grouped by type.

Provides access to:
- Manage
- Change Log

> Rules:
> Updating assessments `Manage` 
>   - Allowed only to `Super Admins`, `Distributor` and `Sub-Distributor`
>   - To Allowed Users they can also update their own assessments

##### Change Log
Tracks changes and records when they occurred.

##### Manage: Update Account Assessment
Allows updating of account assessment settings, including:
- Assessment Limit 
  - Max Respondents
  - Default start date
  - Default expiration date
  - Status

#### Meter Management
Displays the user’s meter information.

- Provides access to `Meter Logs` to see history of meter logs

#### Other Account Settings
Contains additional account-related configurations, including but not limited to:

- Account limits
- Account expiration
- Usage settings
- Contract settings

#### List of Users
Displays users that can be managed or are under the hierarchy of the selected account.

Provides access to:
- View
- Update
- Archive

#### View: Config
##### Privacy Consent
Allows updating of displayed `consent data`, including optional checkboxes for `data collection` and `photo capture`.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

##### Demographics
Allows configuration of the demographic form, including setting fields as optional or required.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

##### Assessment Completion Page
Allows updating of displayed `completion` of the assessment.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

##### Assessment Center Logo
Allows updating of displayed `Logo` of the account.

> Rule: Access is controlled via `Admin` `RBAC policies`, limited to specific user groups.

##### Unblock Account
Allows to unblock account

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For their own account they are not able to access this.

### Update: Section
1. Account Information
Allows updating:
- Account Name
- Password
- Primary Contact Name
- Primary Contact Email
- Country
- Business Phone Number
- Business Address
- Same Billing Address flag
- Billing Address
- Expiry Date and Time
- Actual Account Expiration
- Status

> Validation Guard Rails
> - `Billing Address` is required when `Same Billing Address` is unchecked.
> - Password and Confirm Password must match.
> - Input contract must be validated before service persistence.

> Access and Ownership Guard Rails
> - Updating own account must not allow changing:
> - Status
> - Expiry Date and Time
> - Actual Account Expiration
> - Updating other accounts may allow those fields based on role/policy.

---

2. Assign Products
Allows updating assessment meter usage per assessment.

Capabilities:
- Access to `Manage`
- Access to `Change Log`
- Access to `Update Assessment`

> Access Guard Rails:
> - `Update Assessment` must be enforced by Admin RBAC policy.
> - `Manage` and `Change Log` are for: Admin, Distributor, and Sub-Distributor only.

> Product Assignment Guard Rails:
> - At least 1 assessment must be selected.

---

3. Meter Management
Allows:
- Updating account meter points
- Changing `Metering Management Type`:
- Deduct from Self
- Deduct from Parent

Provides:
- `View Meter Log`

> Meter Rules Guard Rails
> - Self mode: meter cannot be `0`.
> - Parent mode: parent meter cannot be `0`.
> - Child meter updates must not exceed parent max/available meters.
> - Super Admin is exempt (treated as infinite meter).
> - Adding child meters deducts the same amount from parent.
> - Changing child metering from `Self -> Parent` returns child balance to parent.
> - Changing child metering from `Parent -> Self` deducts from parent and adds to child.

---

4. Other Account Settings
Allows updating additional account configuration, including:
- Account limits
- Account expiration
- Usage settings
- Contract settings

> UI/Display Guard Rails Discovered
> - `Billing Amount`:
> - Hidden when `Billing Type` is `Included in Package`
> - Visible when `Billing Type` is `With Site Fee`
> - Default value is `0` when shown unless existing stored value is valid non-package amount.
> - In account view, `Site Billing Amount (PHP)` displays `Included in Package` when value is `0` or empty.
> - `Contracted Meters` and `Addendum`:
> - Show only when metering type is `Deduct usage from this account` (`metering_deduction_type = 0`).
> - `Base Meter`:
> - Hidden in review when `Contract Type` is `Volume based`.

---

5. Review Account Details
Able to review Account Information before saving

## Update Assessment
Adding or Removing Assessments from an Account

1. Accounts Section > View Accounts
2. 
  - A. Full Update Page:
    1. Select an Account > Select Update Button (Blue Pencil)
    2. Next for second page of Update Wizard
    3. Find `Update Assessment`
  - B. Specified Update Page:
    1. Select an Account > Select View (Green Eye)
    2. Select the `Assigned Assessment` tab
    3. Select `Update`
    4. Find `Update Assessment`

> Rules:
> If you cant find `Update Assessment`, Double check `roles and permission`
