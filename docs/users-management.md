# Users Module

## Search User Accounts
Search and review users records, including username, emails, status and types.

Table Functions:
- Sort: Applies to all column except actions
- Filter: Status and User type
- Search

Provides Access to `View Archived Users`

### Row Functions
#### View
View Specific information of user, including email, status, user type and date creation

#### Update
Able to update User Informations:
- Username
- Password
    - Show Content
- Email
- Status

> Rules:
> Validation for Password: 
> - 8 Characters
> - 1 lower cased letter
> - 1 upper cased letter
> - 1 number

#### Activate AC-API Access
! Currently Blocked
! Not yet documented

#### Archive
Able to archive user

#### Delete
Able to delete user

### Bulk Actions
#### Export
Download selected masked users information.

1. Select `Users` > `Search User Accounts`
2. Select check boxes of user want to be exported
3. In `Bulk Action` drop down select `Export` 

#### Archive
Archive selected user.

1. Select `Users` > `Search User Accounts`
2. Select check boxes of user want to be archive
3. In `Bulk Action` drop down select `Archive` 

## View Archive Users
Search and review archive users records, including username, emails, status and types.

Table Functions:
- Sort: Applies to all column except actions
- Filter: Status and User type
- Search

### Row Functions
#### View
View Specific information of archived user, including email, parent status, user type and date creation

#### Update
Able to update archived User Information:
- Username
- Password
    - Show Content
- Email
- Status

> Rules:
> Validation for Password: 
> - 8 Characters
> - 1 lower cased letter
> - 1 upper cased letter
> - 1 number
> 
> Parent:
> - Some Account Type has no parent: No Parents: Administrator (ASD), Super Admin (IT), API Access, Test Creator

#### Activate AC-API Access
! Currently Blocked
! Not yet documented

#### Archive
Able to archive archived user

#### Delete
Able to delete archived user

### Bulk Actions
#### Export
Download selected masked archived users information.

1. Select `Users` > `Search User Accounts`
2. Select `View Active Users`
3. Select check boxes of user want to be exported
4. In `Bulk Action` drop down select `Export` 

#### Retrieve
Retrieve selected archived user.

1. Select `Users` > `Search User Accounts`
2. Select `View Active Users`
3. Select check boxes of user want to be retrieve
4. In `Bulk Action` drop down select `Retrieve` 