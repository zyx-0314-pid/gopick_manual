# Meter Domain Governance

## Overview

The Meter system manages operational credit balances used for assessment-related report generation.

Meters follow hierarchy-based governance where:
- visibility
- transfer authority
- request authority
- operational management
- consumption responsibility

depend on account hierarchy level.

The system behaves as a hierarchy-governed operational credit and audit system.

---

# Hierarchy Structure

```text
Super Admin (IT)
Super Admin (ASD)
- Distributor
-- Sub Distributor
--- Client Account
---- Self Registered
---- Sub-Account
------ Self Registered
```

Higher hierarchy accounts have wider:
- visibility
- operational authority
- request approval authority
- transfer scope
- report visibility
- meter log visibility

---

# Meter Definition

A Meter is a consumable operational credit.

Meters are consumed during:
- assessment completion

Meters are not consumed during:
- report viewing
- report downloading
- report emailing
- revisiting generated reports

Generated reports remain permanently accessible after creation.

---

# Meter Consumption

## Consumption Trigger

Meter deduction occurs during:
- assessment completion

Consumption occurs:
- once per candidate
- per assessment

---

## Consumption Ownership

Candidates consume meters from their owning/managing account.

Accounts that may own candidates:
- Sub Distributor
- Client Account
- Sub-Account
- Self Registered

---

# Generated Reports

Generated reports:
- remain permanently accessible
- may be revisited repeatedly
- may be downloaded multiple times
- may be emailed multiple times

without additional confirmed meter deduction.

Higher hierarchy accounts may access descendant reports.

---

# Consumption Types

Accounts may use:
- Self Consumption
- Parent Consumption

---

## Self Consumption

Consumes meters from:
- own balance

---

## Parent Consumption

Consumes meters using:
- parent-related balance behavior

Observed behavior:
- some operations still validate local balance

---

# Consumption Type Changes

## Self → Parent

Behavior:
- existing meter balance is returned to the account performing the change

---

## Parent → Self

Behavior:
- meter balance is deducted from the account performing the change

---

# Meter Requests

Lower hierarchy accounts may:
- request meters from higher hierarchy accounts

Higher hierarchy accounts may:
- approve descendant account requests

---

## Request Actions

Supported:
- Approve
- Reject
- Cancel

Not Supported:
- Edit after creation
- Partial approval

---

## Request Approval

Approving a request:
- deducts meter balance from the approving account

Super Admins are exempt from meter deduction.

---

## Request Cancellation

Requests may be cancelled by:
- requestor
- higher hierarchy accounts

Cancelled requests remain visible historically.

---

# Meter Transfers

Transfers:
- move balances immediately
- do not require approval

---

## Transfer Scope

Standard accounts may:
- transfer downward
- transfer to descendant accounts
- transfer to self

Standard accounts cannot:
- transfer upward
- transfer cross-branch
- transfer to unrelated same-level accounts

---

## Super Admin Transfer Scope

Super Admins may:
- transfer across all hierarchy branches
- transfer to any account

---

# Meter Visibility

## Meter Logs

Accounts may:
- view their own meter logs

Higher hierarchy accounts may:
- view descendant account logs

Visibility follows hierarchy lineage.

---

## Reports

Higher hierarchy accounts may:
- view descendant reports

Cross-branch visibility is restricted unless Super Admin.

---

# Administrative Meter Operations

Higher hierarchy accounts may:
- add meters
- deduct meters

Behavior:
- balance movement affects the account performing the update

---

# Negative Balance Enforcement

Negative balances are not allowed.

Operations are blocked if resulting balance becomes:
```text
< 0
```

Applies to:
- transfers
- deductions
- account creation
- meter updates
- consumption type changes
- assessment completion consumption

---

# Super Admin Governance

Super Admins:
- are not meter-deducted
- may create all account types
- may transfer across all branches
- may access all accounts
- may access all reports
- may access all logs

Super Admins still cannot:
- perform operations causing balance `< 0`

---

# Self Registered Governance

Self Registered acts as:
- Account
- Candidate

Characteristics:
- can own meters
- can receive transfers
- can consume meters
- cannot request meters
- cannot access admin-side pages

---

# Historical Log Governance

Logs are:
- system-generated
- operationally persistent
- hierarchy-visible

Archived and deactivated account logs:
- remain historically visible

---

# Lifecycle States

Accounts may become:
- Expired
- Deactivated
- Archived
- Deleted

---

# Confirmed Operational Characteristics

The Meter system currently operates as:
- hierarchy-governed operational credit system
- delegated consumption system
- operational audit/history system
- persistent report-access system

The system enforces:
- hierarchy-based authority
- hierarchy-based visibility
- strict non-negative balance integrity
- persistent operational history

---

## Gaps

- **Parent Consumption Account Creation Validation**
  
  Accounts using `Parent Consumption` may fail account creation when the creator's local meter balance is `0`, even when the parent account still has available balance.
  
  This happens because some account creation validations still check the creator's local balance instead of the parent-related consumption behavior.
  
  Current observed impact:
  - Sub Distributor accounts using parent consumption may become unable to create Client or Sub-Account records when their own local balance is `0`.

---

- **Distributor Candidate Management Workflow**
  
  Distributor accounts can have candidates assigned under them through admin-side operations, but Distributor-side candidate management workflow is currently unclear.
  
  Current observed behavior:
  - Admin accounts may create candidates under Distributor accounts.
  - Distributor accounts currently do not have a clearly confirmed candidate management workflow.

  Current concern:
  - Ownership and operational management responsibility becomes unclear for Distributor-managed candidates.

---

- **Deleted Account Meter Governance**
  
  Meter behavior for `Deleted` accounts is not yet formally confirmed.

  Current unclear areas:
  - Remaining meter balances
  - Historical meter logs
  - Generated reports
  - Request history
  - Transfer history
  - Visibility retention after deletion

  Current concern:
  - Historical audit consistency and balance ownership behavior may become inconsistent without formally defined deletion handling.

---

- **Archived, Deactivated, Expired Account Meter Governance**
  
  Meter behavior for `Archived, Deactivated, Expired` accounts is not yet formally confirmed.

  Current unclear areas:
  - Remaining meter balances

  Current concern:
  - Historical audit consistency and balance ownership behavior may become inconsistent without formally defined deletion handling.

---

- **Multi-Report Meter Deduction Behavior**
  
  Meter deduction currently occurs during the initial assessment completion event and generated reports remain reusable afterward.

  However, assessments containing multiple reports do not yet have formally confirmed additional deduction behavior.

  Current unclear behavior:
  - Whether additional reports under the same assessment should trigger additional meter deduction.
