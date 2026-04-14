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
- **Camera** and **Mic** Requirements (required)
Link Validity
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

---

3. Assign Products
- Select Assessment

> Rules: 
> - At least 1 assessment

---

4. Review Candidate Details
Review Information of candidate entry before saving

## View Candidates

### View Assessments
View the assessments for candidate

1. Canidates Section > View Canidate Page
2. Selecting Candidate
  - (Admins) Select Distributor Account > Select Candidate to View
  - (Accounts) Select Candidate to View
3. Actions > View Assessment

> Rules: 
> - Each single assessment is rendered as a standalone row.
> - Test batteries are represented by listing their associated single assessments, each labeled with a corresponding tag.

### Update Assessment
Able to add more Assessment to candidate

1. Canidates Section > View Canidate Page
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