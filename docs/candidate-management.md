# Candidate Module

> Legends:
> (Admin) - Super Admin IT or Super Admin ASD
> (Accounts) - Distributor, Sub Distributor, Client, Sub-Client 

## Schedule Candidate
### Schedule Type: 
- Candidate Schedule
Schedule multiple candidates with the same assessment
- Data Encoding
Schedule multiple candidates who took assessment via paper and pen

### Scheduling
1. Candidate Information
- Select **Account Name** (Company to create the candidate) (required)
- Input: **First Name**, **Last Name**, **Candidate Email** and **Gender** (required)

> Rules: 
> - 1 Account name at a time
> - Avoid Duplicate Email

---

2. Test Requirements
- Candidate Schedule
  - *Test Requirements*
    - **Camera** Requirements (required)
    - **Mic** Requirements (required)
  - *Link Validity*
    - **Start Date** (required)
    - **Time Start** (required and autofill)
    - **Expiration Date** (required and autofill)
    - **Time Expiration** (required and autofill)
  - *Assessment Reminder* (required)
      - **Reminder Frequency**: Every (S, M, T, W, Th, F, S) - Check box
        or
      - **Every # of days interval**: (2, 3, 4, 5, 6) - Check box
    - **Reminder Time** (required and autofill)
  - *Assessment Report Recipient* (required)
    - **Candidate Email as Report Recipient**
      or
    - **Report Recipient Email**
      - Can have multiple recipient using `,` as separator
  - *Assessment Invitation*
    - *Assessment Invitation Email*: Checkbox (required and autofill)
      - **Candidate Email** (default)
      - **Report Recipient**
      - **Custom Email**
        - Custom Assessment Invitation Email (if *Custom Email* is ticked)
          - Email Entry
  - *Backup Email*
      - Email Entry (required and autofill)

- Data Encoding
  - *Link Validity*
    - **Start Date** (required)
    - **Time Start** (required and autofill)
  - *Assessment Report Recipient* (required)
    - **Candidate Email as Report Recipient**
      or
    - **Report Recipient Email**
      - Can have multiple recipient using `,` as separator
  - *Backup Email*
    - Email Entry (required and autofill)

> Rules:
> `Assessment Report Recipient` - uses email checking on server side
> `Assessment Report Recipient` - can enter multiple emails using `,` as separator

---

3. Assign Products
Select Assessments that Company/Organization can use.

Assessment have the following category:
- Cognitive/Knowledge-based Assessment
- Competency-based Assessment
- Survey
- Behavioral/Personality-Based Assessment
- Test Battery, A group of Assessments bundled together

> Rules:
> - At least 1 assessment
> - When a `single assessment` is selected, `all test batteries` containing that assessment are locked.
> - When a `test battery` is selected, `all single assessments` included in that battery are locked.
> - When a `test battery` is selected, `all other test batteries` that share at least one common `single assessment` are also locked.

---

4. Review Candidate Details
Review Information of candidate entry before saving

## View Candidates

### View Assessments
View the assessments for candidate

1. Candidates Section > View Candidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment

> Rules: 
> - Each single assessment is rendered as a standalone row.
> - Test batteries are represented by listing their associated single assessments, each labeled with a corresponding tag.

#### Update Assessment
Able to add more Assessment to candidate

1. Candidates Section > View Candidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment
4. Click `Add Assessment`
5. Select checkbox/Radio boxes of assessments with their norms, types, etc.
6. Save Button below

> Rules:
> - When a `single assessment` is selected, `all test batteries` containing that assessment are locked.
> - When a `test battery` is selected, `all single assessments` included in that battery are locked.
> - When a `test battery` is selected, `all other test batteries` that share at least one common `single assessment` are also locked.

#### Download/View Reports of Assessments
Able to download/view Assessments Reports

1. Candidates Section > View Candidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment
4. Select an Assessment from the table
5. Select the `Eye/View` icon from Actions column
6. Dropdown of Download or View will appear
7. For Multiple types of report another layer of drop down may appear while for the single type report it will be shown or downloaded immediately

> Rules: If the `Eye/View` is grayed out it means assessment is still not completed to make a report

#### Email Report of Assessments
Able to Email Assessments Reports to Specific Users

1. Candidates Section > View Candidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment
4. Select an Assessment from the table
5. Select the `Mail` icon from Actions column
6. A modal form will appear and just simply enter `Email` of target recipient
7. Then `Send`

#### Other Assessment Functions
Other Functionalities available

##### View Response
View the Responses of the Candidate

##### Change Norm
Able to update the norm used to create the report of the assessment

1. Candidates Section > View Candidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment
4. Select an Assessment from the table
5. Select the `Cog/Settings` icon from Actions column
6. Select `Change Norm`
7. Select New Norm
8. Save

##### Extract Response
Download the candidate's responses

##### Reset Assessment
Reset the entire assessment for the candidate (clear responses, scores, and related report artifacts)

##### Reset by Page
Reset answers/scores for one or more pages of the assessment (page-level partial reset)