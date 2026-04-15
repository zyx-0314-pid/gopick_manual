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
| Create Self Registration                                                                     | Create | Requires Distributor, Sub Ditributor or Client as Parent                                    |                                                                                                                               | X                | X                   | X            | X          | X             | X           | X               | X              | -           | -                 |
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

### Config: Drop Down
#### Privacy Consent
Allows updating of displayed `consent data`, including optional checkboxes for `data collection` and `photo capture`.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to acccess this.

#### Demographics
Allows configuration of the demographic form, including setting fields as optional or required.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to acccess this.

#### Assessment Completion Page
Allows updating of displayed `completion` of the assessment.

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For `Distributor` own account they are not able to acccess this.

#### Assessment Center Logo
Allows updating of displayed `Logo` of the account.

> Rule: Access is controlled via `Admin` `RBAC policies`, limited to specific user groups.

#### Unblock Account
Allows to unblock account

> Rule: 
> - Access is controlled via `Admin` `RBAC policies`.
> - For their own account they are not able to acccess this.

## Update: Sections
### Accout Information
Allows updating of the following informations:
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

### Assign Products
Allows updating assessments Meter for each of assessments.
- Provides access to `Manage` and `Change Log` to be able to Update Specific Account Assessment.
- Provides access to `Update Assessment` to be able to update assessments

> Rules: Access is controlled via `Admin` `RBAC policies` of `Update Assessment` 

### Meter Management
Allows updating assessments `Meter Points` for each account and/or change `Metering Management Type`: Deduct from `Self` or `Parent`

- Provides access to `View Meter Log` to see history of meter logs

> Rule: 
> `Self`: Meter Can't be 0
> `Parent`: Meter Can't be 0 for the parent

### Other Account Settings
Allows updating additional account-related configurations, including but not limited to:

- Account limits
- Account expiration
- Usage settings
- Contract settings

### Review Account Details
Able to review Account Informations before saving
