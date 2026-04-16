# RBAC Matrix
| -   | -   | -   | -   | User | - | - | - | - | Accounts | - | - | - | - |
| --- | --- | --- | --- |Super Admin (IT) | Super Admin (ASD) | Test Creator | API Access | Administrator | Distributor | Sub Distributor | Client Account | Sub Account | Self Registration |
| Function                                                                                     | CRUD   | Limitations                                                                                 | Scope                                                                                                                         | -                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| -------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------- | ------------ | ---------- | ------------- | ----------- | --------------- | -------------- | ----------- |
| Create Super Admin (IT)                                                                      | Create |                                                                                             |                                                                                                                               | X                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Create Super Admin (ASD)                                                                     | Create |                                                                                             |                                                                                                                               | X                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Create Test Creator                                                                          | Create |                                                                                             |                                                                                                                               | X                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Create API Access                                                                            | Create |                                                                                             |                                                                                                                               | X                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Create Administrator                                                                         | Create |                                                                                             |                                                                                                                               | -                | X                   | X            | X          | X             | X           | X               | X              | X           | -                 |
| -                                                                                            | -      | -                                                                                           | -                                                                                                                             | -                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Create Distributor                                                                           | Create |                                                                                             |                                                                                                                               | X                | -                   | X            | X          | -             | -           | -               | -              | -           | -                 |
| Create Sub Distributor                                                                       | Create | Requires Distributor as Parent                                                              |                                                                                                                               | X                | X                   | X            | X          | X             | X           | -               | -              | -           | -                 |
| Create Client Account                                                                        | Create | Requires Sub Distributor as Parent                                                          |                                                                                                                               | X                | X                   | X            | X          | X             | X           | X               | -              | -           | -                 |
| Create Sub Account                                                                           | Create | Requires Client as Parent                                                                   |                                                                                                                               | X                | X                   | X            | X          | X             | X           | X               | X              | -           | -                 |
| Create Self Registration                                                                     | Create | Requires Distributor, Sub Distributor or Client as Parent                                    |                                                                                                                               | X                | X                   | X            | X          | X             | X           | X               | X              | -           | -                 |
| -                                                                                            | -      | -                                                                                           | -                                                                                                                             | -                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| Update `Personal Account`: Distributor, Sub-Distributor, Client, Sub Client, Self Registered | Update |                                                                                             | Allowed Changes: name of organization, contact person, email, number, password, country, business address and billing address | N                | N                   | N            | N          | N             | X           | X               | X              | X           | -                 |
| Update `Personal User`: Super Admin, Admin, Test Creator, API Access                         | Update | Exclude: Status, User Type                                                                  | Allowed Changes: Password, Username, Email                                                                                    | X                |                     |              |            |               | N           | N               | N              | N           | N                 |
| -                                                                                            | -      | -                                                                                           | -                                                                                                                             | -                | -                   | -            | -          | -             | -           | -               | -              | -           | -                 |
| (Parent: Account/User) Update Children Accounts                                              | Update | Exclude: Username, Account Type, Parent Account                                             |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| (Parent: Account/User) Archive Children Accounts                                             | Update |                                                                                             |                                                                                                                               | X                |                     |              |            |               | X           | X               | X              | X           | -                 |
| -                                                                                            | -      | -                                                                                           | -                                                                                                                             | Super Admin (IT) | Super Admin (ASD) | Test Creator | API Access | Administrator | Distributor | Sub Distributor | Client Account | Sub Account | Self Registration |
| Content Manager Module                                                                             | Update | Privacy Consent: `modContentManager-actionIndex ` > `List/Search` = `Privacy Consent`       |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| Content Manager Module                                                                             | Update | Demographics: `modContentManager-actionDemographics` > `Demographics Page Setup`            |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| Content Manager Module                                                                             | Update | Assessment Completion Page: `modContentManager-actionFinishPage` > `Exam Finish Page Setup` |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| Content Manager Module                                                                             | Update | Assessment Center Logo: `modContentManager-actionUploadLogoPage` > `Upload Logo Page`       |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| Content Manager Module                                                                             | Update | Unblock Account: `modUsers-actionUnblock` > `Unblock Account`                               |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |
| ---                                                                                          | ---    | ---                                                                                         | ---                                                                                                                           | Super Admin (IT) | Super Admin (ASD) | Test Creator | API Access | Administrator | Distributor | Sub Distributor | Client Account | Sub Account | Self Registration |
| Assessment-Schedule Module                                                                              | Update | Update Assessment of Child Users: `modAssessmentSchedule-actionCreate` > `Unblock Account`                               |                                                                                                                               | C                |                     |              |            |               | C           | C               | C              | C           | -                 |

## Edit
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   | -   |

---

## Legends
X - Hard Coded Available
C - Conditional Controlled by Super Admin
N - Not Applicable
- - Hard Coded Not Available

---

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

# Create Account
1. Account Information
- Account Type (required)
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
- Expiry date & TIme (required)
- Actual Account Expiration (required and autofill)
- Status (autofill)

> Rules: 
> - Account Type: You can only select lower than your account type
> - `Password` and `Confirm Password` should match'

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
> - When a `single assessment` is selected, `all test batteries` containing that assessment are locked.
> - When a `test battery` is selected, `all single assessments` included in that battery are locked.
> - When a `test battery` is selected, `all other test batteries` that share at least one common `single assessment` are also locked.

---

3. Meter Management
Set Meter Management Type and Meter Balance

Meter Management Type: Self and Parent Based
Self = Deduct usage from this account
Parent = Deduct usage from Distributor/Sub-Distributor/Client

> Rules:
> - Distributor has only 1 Meter Management Type
>
> - Meter Type Rule:
>   - `Self`: Meter Can't be 0
>   - `Parent`: Meter Can't be 0 for the parent

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
- Set Site Billing Amount (PHP)
- Contact Type:
  - Volume-based
    - Contracted Meters (Disabled)
    - Addendum (autofill, 0)
  - Per Usage
    - Base Meter (autofill, 0)

> Rules:
> - `Sub-Distributor Limit` appears only for `Distributor`
> - `Client Limit` appears only for `Distributor`, `Sub-Distributor`
> - `Sub-Account Limit` appears only for `Distributor`, `Sub-Distributor`, `Client`
> - `Contracted Meters` value are prefilled from `Meter Management` > `Meter balance` part of the form

---

5. Review Account Details
Able to review Account Information before saving

# View Accounts

1. Accounts Section > View Accounts
2. Select Account > View Account

From the View Account you can navigate to the followings:

- [Account Information](#account-information)
- [Assigned Assessments](#assigned-assessments)
- [Meter Management](#meter-management)
- [Other Account Settings](#other-account-settings)
- [List of Users](#list-of-users)

## View: Sections
### Account Information
Displays the basic account information of the user.

### Assigned Assessments
Lists all assessments assigned to the account, grouped by type.

Provides access to:
- Manage
- Change Log

> Rules:
> Updating assessments `Manage` 
>   - Allowed only to `Super Admins`, `Distributor` and `Sub-Distributor`
>   - To Allowed Users they can also update their own assessments

#### Change Log
Tracks changes and records when they occurred.

#### Manage: Update Account Assessment
Allows updating of account assessment settings, including:
- Assessment Limit 
  - Max Respondents
  - Default start date
  - Default expiration date
  - Status

### Meter Management
Displays the user’s meter information.

- Provides access to `Meter Logs` to see history of meter logs

### Other Account Settings
Contains additional account-related configurations, including but not limited to:

- Account limits
- Account expiration
- Usage settings
- Contract settings

### List of Users
Displays users that can be managed or are under the hierarchy of the selected account.

Provides access to:
- View
- Update
- Archive

### View: Config
#### Privacy Consent
Allows updating of displayed `consent data`, including optional checkboxes for `data collection` and `photo capture`.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

#### Demographics
Allows configuration of the demographic form, including setting fields as optional or required.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

#### Assessment Completion Page
Allows updating of displayed `completion` of the assessment.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to access this.

#### Assessment Center Logo
Allows updating of displayed `Logo` of the account.

> Rule: Access is controlled via `Admin` `RBAC policies`, limited to specific user groups.

#### Unblock Account
Allows to unblock account

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For their own account they are not able to access this.

## Update: Sections
1. Account Information
Allows updating of the following information:
- Account Name
- Password
- Primary Contact Name
- Primary Contact Email
- Country
- Business Phone Number
- Business Address
- Checkbox for similar Business Address with Billing Address
  - Billing Address
    - (Optional, if checkbox isn't checked the following is required)
- Expiry Date and Time
- Actual Account Expiration
- Status

---

2. Assign Products
Allows updating assessments Meter for each of assessments.
- Provides access to `Manage` and `Change Log` to be able to Update Specific Account Assessment.
- Provides access to `Update Assessment` to be able to update assessments

> Rules: 
> - Access is controlled via `Admin` `RBAC policies` of `Update Assessment` 
> - `Manage` and `Change Log` are ony for `Admin`, `Distributor` and `Sub-Distributor` 

---

3. Meter Management
Allows updating assessments `Meter Points` for each account and/or change `Metering Management Type`: Deduct from `Self` or `Parent`

- Provides access to `View Meter Log` to see history of meter logs

> Rule: 
> Meter Type Rule:
> - `Self`: Meter Can't be 0
> - `Parent`: Meter Can't be 0 for the parent
> 
> Updating a child account meter balance must not exceed the parent account's maximum or available meter balance.
> - Super Admin accounts are exempt because their meter balance is treated as infinite.
>
> Adding meter balance to a child account deducts the same amount from the parent account.
>
> Changing a child account metering type from `Self` to `Parent` returns the child account balance to the parent account.
>
> Changing a child account metering type from `Parent` to `Self` deducts the balance from the parent account and adds it to the child account.

4. Other Account Settings
Allows updating additional account-related configurations, including but not limited to:

- Account limits
- Account expiration
- Usage settings
- Contract settings

5. Review Account Details
Able to review Account Information before saving
