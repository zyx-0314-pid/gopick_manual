// accounts data filler — hold page content in JS and render non-table content into the page
(function (global) {
    'use strict';

    const accountsContent = {
        title: 'Accounts Management',
        sections: [
            { id: 'legend', title: 'Legend' },
            { id: 'rbac-matrix', title: 'RBAC Matrix' },
            { id: 'hierarchy', title: 'Account Hierarchy' },
            { id: 'account-rules', title: 'Account Rules' },
            {
                id: 'create-account',
                title: 'Create Account',
                children: [
                    { id: 'create-account-information', title: 'Account Information' },
                    { id: 'create-assign-products', title: 'Assign Products' },
                    { id: 'create-meter-management', title: 'Meter Management' },
                    { id: 'create-other-account-settings', title: 'Other Account Settings' },
                    { id: 'create-review-account-details', title: 'Review Account Details' }
                ]
            },
            {
                id: 'view-accounts',
                title: 'View Accounts',
                children: [
                    {
                        id: 'view-sections',
                        title: 'View: Sections',
                        children: [
                            { id: 'account-information', title: 'Account Information' },
                            {
                                id: 'assigned-assessments',
                                title: 'Assigned Assessments',
                                children: [
                                    { id: 'change-log', title: 'Change Log' },
                                    { id: 'manage-update-account-assessment', title: 'Manage: Update Account Assessment' }
                                ]
                            },
                            { id: 'meter-management', title: 'Meter Management' },
                            { id: 'other-account-settings', title: 'Other Account Settings' },
                            { id: 'list-of-users', title: 'List of Users' }
                        ]
                    },
                    {
                        id: 'view-config',
                        title: 'View: Config',
                        children: [
                            { id: 'privacy-consent', title: 'Privacy Consent' },
                            { id: 'demographics', title: 'Demographics' },
                            { id: 'assessment-completion-page', title: 'Assessment Completion Page' },
                            { id: 'assessment-center-logo', title: 'Assessment Center Logo' },
                            { id: 'unblock-account', title: 'Unblock Account' }
                        ]
                    },
                    {
                        id: 'update-sections',
                        title: 'Update: Sections',
                        children: [
                            { id: 'update-account-information', title: 'Account Information' },
                            { id: 'assign-products', title: 'Assign Products' },
                            { id: 'update-meter-management', title: 'Meter Management' },
                            { id: 'update-other-account-settings', title: 'Other Account Settings' },
                            { id: 'review-account-details', title: 'Review Account Details' }
                        ]
                    },
                    {
                        id: 'update-update-assessment',
                        title: 'Update: Update Assessment'
                    }
                ]
            },
            { id: 'roles', title: 'Role Capabilities' },
            { id: 'access', title: 'Configuration Steps' }
        ],
        hierarchyLines: [
            'Super Admin (IT)',
            'Super Admin (ASD)',
            '└─ Distributor',
            '   ├─ Administrator',
            '   ├─ Self Registration',
            '   └─ Sub Distributor',
            '      ├─ Administrator',
            '      ├─ Self Registration',
            '      └─ Client',
            '         ├─ Administrator',
            '         └─ Sub Client',
            '            ├─ Administrator',
            '            └─ Self Registration'
        ],
        legends: [
            { sym: 'X', label: 'Hard-coded available', cls: 'rbac-x' },
            { sym: 'C', label: 'Conditional (Super Admin config)', cls: 'rbac-c' },
            { sym: 'N', label: 'Not applicable', cls: 'rbac-n' },
            { sym: '—', label: 'Hard-coded unavailable', cls: 'rbac-dash' }
        ],
        accessSteps: [
            { title: 'Open Roles/Permissions', detail: 'Open the Roles/Permissions module in the Admin console.' },
            { title: 'Search and select a role', detail: 'Use Search Roles to find the role you want to change.' },
            { title: 'Open configuration', detail: 'Select the role row, then click Edit or Preview.' },
            { title: 'Locate permissions', detail: 'In the Edit view, locate the Permissions list or table.' },
            { title: 'Update permission', detail: 'Find the entry by name/module and toggle access. For conditional permissions, update the condition.' },
            { title: 'Save and verify', detail: 'Save changes and use Preview or impersonation to confirm the role behavior.' }
        ],
        accountRules: [
            'Account-related updates can only be modified by Super Admin (IT/ASD), Distributor, and Sub-Distributor.'
        ],
        viewAccountsLegend: [
            { label: 'Active', detail: 'Active and not yet expired' },
            { label: 'Deactivated', detail: 'Deactivated' },
            { label: 'Expiring', detail: 'Active and exceeded expiration date but not account expiration extension' },
            { label: 'Expired', detail: 'Active, exceeded expiration date and exceeded account expiration extension' }
        ],
        viewAccountSteps: [
            { title: 'Open View Accounts', detail: 'Go to Accounts Section, then open View Accounts.' },
            { title: 'Select and view an account', detail: 'Select Account, then choose View Account.' }
        ],
        createAccountSections: [
            {
                id: 'create-account-information',
                stepTitle: 'Account Information',
                title: 'Account Information',
                detail: 'Fill in the required account details.',
                items: [
                    'Account Type',
                    'Parent Account',
                    'Account Name: Company or organization account name',
                    'Username',
                    'Password',
                    'Confirm Password',
                    'Primary Contact Name',
                    'Primary Contact Email',
                    'Country',
                    'Business Phone Number',
                    'Business Address',
                    'Billing Address: required or set as same as Business Address',
                    'Expiry Date and Time',
                    'Actual Account Expiration: required and autofilled',
                    'Status: autofilled'
                ],
                rules: [
                    {
                        label: 'Validation Guard Rails',
                        children: [
                            'Account Type: You can only select lower than your account type (check Hierarchy).',
                            'Password and Confirm Password should match.',
                            'Billing Address can be set to be similar with Business Address by checkbox, or entered manually when unchecked.'
                        ]
                    },
                    {
                        label: 'Account Creation Limit Guard Rails',
                        children: [
                            'Admin: Bypasses the account creation limits found in Other Account Settings.',
                            'Non-Admin: Limited to the accounts they are able to create per the limits in Other Account Settings.',
                            'Active Accounts: not deactivated, not archived, not deleted, not expired.',
                            'Expired: Determined by Expiry Date + Actual Account Expiration.'
                        ]
                    }
                ]
            },
            {
                id: 'create-assign-products',
                stepTitle: 'Assign Products',
                title: 'Assign Products',
                detail: 'Select assessments that the company or organization can use.',
                items: [
                    'Cognitive or knowledge-based assessment',
                    'Competency-based assessment',
                    'Survey',
                    'Behavioral or personality-based assessment',
                    'Test Battery: a group of assessments bundled together'
                ],
                rules: [
                    'At least one assessment must be selected.'
                ]
            },
            {
                id: 'create-meter-management',
                stepTitle: 'Meter Management',
                title: 'Meter Management',
                detail: 'Set Meter Management Type and Meter Balance.',
                items: [
                    'Self: deduct usage from this account.',
                    'Parent: deduct usage from Distributor, Sub-Distributor, or Client.'
                ],
                rules: [
                    {
                        label: 'Meter Management Guard Rails',
                        children: [
                            'Sub-Account has 2 Meter Management Type while the rest are 1 Meter Management Type.',
                            'Self: Meter balance cannot be 0.',
                            'Parent: Parent meter balance cannot be 0.',
                            'Max Meter: 99,999'
                        ]
                    }
                ]
            },
            {
                id: 'create-other-account-settings',
                stepTitle: 'Other Account Settings',
                title: 'Other Account Settings',
                detail: 'Set additional account-related configurations.',
                items: [
                    'User Account Limit: autofilled as 99',
                    'Sub-Distributor Limit: autofilled as 0',
                    'Client Limit: autofilled as 0',
                    'Sub-Account Limit: autofilled as 0',
                    'Self Registration Limit: autofilled as 0',
                    'API Access Username',
                    'HRSC Name',
                    'HRSC Email',
                    'Assessment Specialist Name',
                    'Assessment Special Email',
                    'Client Contact Person Name',
                    'Set Client Usage Recipient Email',
                    'Set Site Billing Type (Included in Package or With Site Fee)',
                    'Set Billing Amount (PHP)',
                    'Contact Type: Volume-based with Contracted Meters disabled and Addendum autofilled as 0',
                    'Contact Type: Per Usage with Base Meter autofilled as 0'
                ],
                rules: [
                    {
                        label: 'Display & Visibility Guard Rails',
                        children: [
                            'Sub-Distributor Limit appears only for Distributor.',
                            'Client Limit appears only for Distributor and Sub-Distributor.',
                            'Sub-Account Limit appears only for Distributor, Sub-Distributor, and Client.',
                            'Billing Amount: Appears only when Set Site Billing Type is With Site Fee.'
                        ]
                    },
                    {
                        label: 'Data Sync Guard Rails',
                        children: [
                            'Contracted Meters values are prefilled from the Meter Management meter balance part of the form.',
                            'Addendum value is locked when the selected Meter Type is Parent.',
                            'Max Limit of Account Limits: 999',
                            'Max Value of Addendum, Base Meter and Billing Amount: 999'
                        ]
                    }
                ]
            },
            {
                id: 'create-review-account-details',
                stepTitle: 'Review Account Details',
                title: 'Review Account Details',
                detail: 'Review account information before saving.'
            }
        ],
        viewAccountSections: [
            {
                id: 'account-information',
                title: 'Account Information',
                detail: 'Displays the basic account information of the user.'
            },
            {
                id: 'assigned-assessments',
                title: 'Assigned Assessments',
                detail: 'Lists all assessments assigned to the account, grouped by type.',
                actions: ['Manage', 'Change Log'],
                rules: [
                    'Updating assessments through Manage is allowed only to Super Admins, Distributor, and Sub-Distributor.',
                    'Allowed users can also update their own assessments.'
                ],
                children: [
                    {
                        id: 'change-log',
                        title: 'Change Log',
                        detail: 'Tracks changes and records when they occurred.'
                    },
                    {
                        id: 'manage-update-account-assessment',
                        title: 'Manage: Update Account Assessment',
                        detail: 'Allows updating account assessment settings.',
                        items: [
                            {
                                label: 'Assessment Limit',
                                children: ['Max Respondents', 'Default start date', 'Default expiration date', 'Status']
                            }
                        ]
                    }
                ]
            },
            {
                id: 'meter-management',
                title: 'Meter Management',
                detail: 'Displays the user meter information.',
                actions: ['Meter Logs'],
                note: 'Use Meter Logs to see history of meter logs.'
            },
            {
                id: 'other-account-settings',
                title: 'Other Account Settings',
                detail: 'Contains additional account-related configurations, including but not limited to:',
                items: ['Account limits', 'Account expiration', 'Usage settings', 'Contract settings']
            },
            {
                id: 'list-of-users',
                title: 'List of Users',
                detail: 'Displays users that can be managed or are under the hierarchy of the selected account.',
                actions: ['View', 'Update', 'Archive']
            }
        ],
        viewAccountConfigSections: [
            {
                id: 'privacy-consent',
                title: 'Privacy Consent',
                detail: 'Allows updating displayed consent data, including optional checkboxes for data collection and photo capture.',
                rules: [
                    'Access is controlled via Admin RBAC policies.',
                    'Distributor own accounts cannot access this.'
                ]
            },
            {
                id: 'demographics',
                title: 'Demographics',
                detail: 'Allows configuration of the demographic form, including setting fields as optional or required.',
                rules: [
                    'Access is controlled via Admin RBAC policies.',
                    'Distributor own accounts cannot access this.'
                ]
            },
            {
                id: 'assessment-completion-page',
                title: 'Assessment Completion Page',
                detail: 'Allows updating the displayed assessment completion page.',
                rules: [
                    'Access is controlled via Admin RBAC policies.',
                    'Distributor own accounts cannot access this.'
                ]
            },
            {
                id: 'assessment-center-logo',
                title: 'Assessment Center Logo',
                detail: 'Allows updating the displayed logo of the account.',
                rules: ['Access is controlled via Admin RBAC policies, limited to specific user groups.']
            },
            {
                id: 'unblock-account',
                title: 'Unblock Account',
                detail: 'Allows unblocking an account.',
                rules: [
                    'Access is controlled via Admin RBAC policies.',
                    'Users cannot access this for their own account.'
                ]
            }
        ],
        updateAccountSections: [
            {
                id: 'update-account-information',
                stepTitle: 'Account Information',
                title: 'Account Information',
                detail: 'Allows updating account information.',
                items: [
                    'Account Name',
                    'Password',
                    'Primary Contact Name',
                    'Primary Contact Email',
                    'Country',
                    'Business Phone Number',
                    'Business Address',
                    {
                        label: 'Same Billing Address flag',
                        children: ['Billing Address is required when Same Billing Address is unchecked.']
                    },
                    'Expiry Date and Time (Locked for own account)',
                    'Actual Account Expiration (Locked for own account)',
                    'Status (Locked for own account)'
                ],
                rules: [
                    {
                        label: 'Validation Guard Rails',
                        children: [
                            'Billing Address is required when Same Billing Address is unchecked.',
                            'Password and Confirm Password must match.',
                            'Input contract must be validated before service persistence.'
                        ]
                    },
                    {
                        label: 'Access and Ownership Guard Rails',
                        children: [
                            'Updating own account must not allow changing: Status, Expiry Date and Time, Actual Account Expiration.',
                            'Updating other accounts may allow those fields based on role/policy.'
                        ]
                    }
                ]
            },
            {
                id: 'assign-products',
                stepTitle: 'Assign Products',
                title: 'Assign Products',
                detail: 'Allows updating assessment meters for each assessment.',
                actions: ['Manage', 'Change Log', 'Update Assessment'],
                rules: [
                    {
                        label: 'Access Guard Rails',
                        children: [
                            'Access to Update Assessment is restricted to Admin, Distributor, and Sub-Distributor only.',
                            'Updating own account assessments is allowed for these roles.',
                            'Manage and Change Log are only for Admin, Distributor, and Sub-Distributor.'
                        ]
                    },
                    {
                        label: 'Product Assignment Guard Rails',
                        children: [
                            'At least one assessment must be selected.'
                        ]
                    }
                ]
            },
            {
                id: 'update-meter-management',
                stepTitle: 'Meter Management',
                title: 'Meter Management',
                detail: 'Allows updating account meter points and changing the Metering Management Type: Deduct from Self or Deduct from Parent. Provides access to View Meter Log.',
                actions: ['View Meter Log'],
                rules: [
                    {
                        label: 'Meter Rules Guard Rails',
                        children: [
                            'Self mode: meter cannot be 0.',
                            'Parent mode: parent meter cannot be 0.',
                            'Child meter updates must not exceed parent max/available meters.',
                            'Super Admin is exempt (treated as infinite meter).',
                            'Adding child meters deducts the same amount from parent.',
                            'Changing child metering from Self -> Parent returns child balance to parent.',
                            'Changing child metering from Parent -> Self deducts from parent and adds to child.'
                        ]
                    }
                ]
            },
            {
                id: 'update-other-account-settings',
                stepTitle: 'Other Account Settings',
                title: 'Other Account Settings',
                detail: 'Allows updating additional account-related configurations, including but not limited to:',
                items: ['Account limits', 'Account expiration', 'Usage settings', 'Contract settings'],
                rules: [
                    'Billing Amount is hidden when Billing Type is Included in Package; visible when With Site Fee.',
                    'Default Billing Amount value is 0 when shown unless an existing stored value is valid.',
                    'In account view, Site Billing Amount (PHP) displays Included in Package when value is 0 or empty.',
                    'Contracted Meters and Addendum show only when metering type is Deduct from Self (metering_deduction_type = 0).',
                    'Base Meter is hidden in review when Contract Type is Volume based.'
                ]
            },
            {
                id: 'review-account-details',
                stepTitle: 'Review Account Details',
                title: 'Review Account Details',
                detail: 'Allows reviewing account information before saving.'
            }
        ],
        updateAssessmentSection: {
            id: 'update-update-assessment',
            title: 'Update: Update Assessment',
            detail: 'Adding or removing assessments from an account.',
            routeSteps: [
                {
                    title: 'A. Full Update Page (4 steps)',
                    steps: [
                        'Accounts Section > View Accounts',
                        'Select an Account > Select Update Button (Blue Pencil)',
                        'Proceed to second page of Update Wizard',
                        'Find Update Assessment'
                    ]
                },
                {
                    title: 'B. Specified Update Page (5 steps)',
                    steps: [
                        'Accounts Section > View Accounts',
                        'Select an Account > Select View (Green Eye)',
                        'Select the Assigned Assessment tab',
                        'Select Update',
                        'Find Update Assessment'
                    ]
                }
            ],
            rules: [
                'If you cannot find Update Assessment, double check Roles and Permission.'
            ]
        }
    };

    function createStepCard(index, step) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        const content = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'font-semibold text-slate-900';
        title.textContent = step.title;

        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-500 mt-1';
        detail.textContent = step.detail;

        content.appendChild(title);
        content.appendChild(detail);
        wrap.appendChild(badge);
        wrap.appendChild(content);
        return wrap;
    }

    function getSidebarLinkClass(level) {
        var depth = Math.min(level, 5);
        var indentClasses = ['', ' pl-3 border-l border-slate-100', ' pl-6 border-l border-slate-100', ' pl-9 border-l border-slate-100', ' pl-12 border-l border-slate-100', ' pl-16 border-l border-slate-100'];
        var sizeClass = level === 0 ? ' text-sm' : (level < 3 ? ' text-[13px]' : ' text-xs');
        return 'block text-slate-600 hover:text-brand transition-colors py-1' + sizeClass + indentClasses[depth];
    }

    function createSidebarItem(section, level) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';
        li.dataset.target = section.id;
        li.dataset.level = String(level);

        var a = document.createElement('a');
        a.className = getSidebarLinkClass(level);
        a.href = '#' + section.id;
        a.dataset.target = section.id;
        a.textContent = section.title;
        li.appendChild(a);

        if (section.children && section.children.length) {
            var childList = document.createElement('ul');
            childList.className = 'sidebar-children hidden mt-1 space-y-1';
            section.children.forEach(function (child) {
                childList.appendChild(createSidebarItem(child, level + 1));
            });
            li.appendChild(childList);
        }

        return li;
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        accountsContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
        // Trigger a hashchange to allow other scripts to pick up the active link
        setTimeout(function () { window.dispatchEvent(new Event('hashchange')); }, 10);
    }

    function renderHierarchy() {
        var container = document.getElementById('hierarchyContent');
        if (!container) return;
        container.innerHTML = '';
        var pre = document.createElement('pre');
        pre.className = 'whitespace-pre-wrap';
        pre.textContent = accountsContent.hierarchyLines.join('\n');
        container.appendChild(pre);
    }

    function renderLegend() {
        var container = document.getElementById('legendContent');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.legends.forEach(function (item) {
            var d = document.createElement('div');
            d.className = 'flex items-center gap-2';
            var s = document.createElement('span');
            s.className = item.cls + ' text-base';
            s.textContent = item.sym;
            var lbl = document.createElement('span');
            lbl.className = 'text-slate-600';
            lbl.textContent = item.label;
            d.appendChild(s);
            d.appendChild(lbl);
            container.appendChild(d);
        });
    }

    function renderViewAccountsLegend() {
        var container = document.getElementById('viewAccountsStatusLegend');
        if (!container || !accountsContent.viewAccountsLegend) return;
        container.innerHTML = '';
        
        accountsContent.viewAccountsLegend.forEach(function (item) {
            var d = document.createElement('div');
            d.className = 'p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-1';
            
            var lbl = document.createElement('div');
            lbl.className = 'text-sm font-bold text-slate-900';
            lbl.textContent = item.label;
            
            var det = document.createElement('div');
            det.className = 'text-xs text-slate-500 leading-relaxed';
            det.textContent = item.detail;
            
            d.appendChild(lbl);
            d.appendChild(det);
            container.appendChild(d);
        });
    }

    function renderAccessSteps() {
        var container = document.getElementById('accessSteps');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.accessSteps.forEach(function (s, i) {
            container.appendChild(createStepCard(i + 1, s));
        });
    }

    function createBulletList(items) {
        var list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            var li = document.createElement('li');
            li.className = 'flex gap-2';
            var marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
            var text = document.createElement('span');
            text.textContent = typeof item === 'string' ? item : item.label;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);

            if (item && typeof item !== 'string' && item.children && item.children.length) {
                var nested = document.createElement('ul');
                nested.className = 'ml-7 mt-2 space-y-1 text-sm text-slate-500';
                item.children.forEach(function (child) {
                    var childItem = document.createElement('li');
                    childItem.textContent = child;
                    nested.appendChild(childItem);
                });
                list.appendChild(nested);
            }
        });
        return list;
    }

    function createPillList(items) {
        var wrap = document.createElement('div');
        wrap.className = 'mt-3 flex flex-wrap gap-2';
        items.forEach(function (item) {
            var pill = document.createElement('span');
            pill.className = 'inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand ring-1 ring-red-100';
            pill.textContent = item;
            wrap.appendChild(pill);
        });
        return wrap;
    }

    function createRuleBox(rules) {
        var box = document.createElement('div');
        box.className = 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
        var title = document.createElement('h4');
        title.className = 'font-semibold text-amber-900 mb-2';
        title.textContent = 'Rules';
        box.appendChild(title);
        box.appendChild(createBulletList(rules));
        return box;
    }

    function renderAccountRules() {
        var container = document.getElementById('accountRules');
        if (!container) return;
        container.innerHTML = '';
        container.appendChild(createBulletList(accountsContent.accountRules));
    }

    function renderViewAccounts() {
        var stepsContainer = document.getElementById('viewAccountSteps');
        var sectionsContainer = document.getElementById('viewAccountSections');

        if (stepsContainer) {
            stepsContainer.innerHTML = '';
            accountsContent.viewAccountSteps.forEach(function (step, i) {
                stepsContainer.appendChild(createStepCard(i + 1, step));
            });
        }

        if (sectionsContainer) {
            sectionsContainer.innerHTML = '';
            accountsContent.viewAccountSections.forEach(function (section) {
                var card = document.createElement('article');
                card.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
                card.id = section.id;

                var title = document.createElement('h3');
                title.className = 'font-semibold text-slate-900 mb-2';
                title.textContent = section.title;

                var detail = document.createElement('p');
                detail.className = 'text-sm text-slate-600 leading-relaxed';
                detail.textContent = section.detail;

                card.appendChild(title);
                card.appendChild(detail);

                if (section.actions && section.actions.length) {
                    var actionsLabel = document.createElement('p');
                    actionsLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                    actionsLabel.textContent = 'Provides access to';
                    card.appendChild(actionsLabel);
                    card.appendChild(createPillList(section.actions));
                }

                if (section.items && section.items.length) {
                    card.appendChild(createBulletList(section.items));
                }

                if (section.note) {
                    var note = document.createElement('p');
                    note.className = 'mt-3 text-sm text-slate-500';
                    note.textContent = section.note;
                    card.appendChild(note);
                }

                if (section.rules && section.rules.length) {
                    card.appendChild(createRuleBox(section.rules));
                }

                if (section.children && section.children.length) {
                    var childWrap = document.createElement('div');
                    childWrap.className = 'mt-4 space-y-3';

                    section.children.forEach(function (child) {
                        var childCard = document.createElement('div');
                        childCard.className = 'rounded-lg border border-slate-100 bg-white p-4';
                        childCard.id = child.id;

                        var childTitle = document.createElement('h4');
                        childTitle.className = 'font-semibold text-slate-900 mb-2';
                        childTitle.textContent = child.title;

                        var childDetail = document.createElement('p');
                        childDetail.className = 'text-sm text-slate-600 leading-relaxed';
                        childDetail.textContent = child.detail;

                        childCard.appendChild(childTitle);
                        childCard.appendChild(childDetail);

                        if (child.items && child.items.length) {
                            childCard.appendChild(createBulletList(child.items));
                        }

                        childWrap.appendChild(childCard);
                    });

                    card.appendChild(childWrap);
                }

                sectionsContainer.appendChild(card);
            });
        }
    }

    function renderCreateAccountSections() {
        var container = document.getElementById('createAccountSections');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.createAccountSections.forEach(function (section, index) {
            container.appendChild(createInfoStepCard(index + 1, section));
        });
    }

    function createHeading(text, id, eyebrowText) {
        var fragment = document.createDocumentFragment();

        if (eyebrowText) {
            var eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2 mt-6';
            eyebrow.textContent = eyebrowText;
            fragment.appendChild(eyebrow);
        }

        var heading = document.createElement('h3');
        heading.className = 'text-base font-bold text-slate-900 mb-4';
        if (id) heading.id = id;
        heading.textContent = text;
        fragment.appendChild(heading);

        return fragment;
    }

    function createInfoCard(section) {
        var card = document.createElement('article');
        card.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
        card.id = section.id;

        var title = document.createElement('h4');
        title.className = 'font-semibold text-slate-900 mb-2';
        title.textContent = section.title;

        var detail = document.createElement('p');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = section.detail;

        card.appendChild(title);
        card.appendChild(detail);

        if (section.actions && section.actions.length) {
            var actionsLabel = document.createElement('p');
            actionsLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
            actionsLabel.textContent = 'Provides access to';
            card.appendChild(actionsLabel);
            card.appendChild(createPillList(section.actions));
        }

        if (section.items && section.items.length) {
            card.appendChild(createBulletList(section.items));
        }

        if (section.rules && section.rules.length) {
            card.appendChild(createRuleBox(section.rules));
        }

        return card;
    }

    function createInfoStepCard(index, section) {
        var wrap = document.createElement('article');
        wrap.className = 'flex items-start gap-4 rounded-lg border border-slate-100 bg-slate-50 p-5';
        wrap.id = section.id;

        var badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        var content = document.createElement('div');
        content.className = 'min-w-0 flex-1';

        var title = document.createElement('h4');
        title.className = 'font-semibold text-slate-900 mb-2';
        title.textContent = section.stepTitle || section.title;

        var detail = document.createElement('p');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = section.detail;

        content.appendChild(title);
        content.appendChild(detail);

        if (section.actions && section.actions.length) {
            var actionsLabel = document.createElement('p');
            actionsLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
            actionsLabel.textContent = 'Provides access to';
            content.appendChild(actionsLabel);
            content.appendChild(createPillList(section.actions));
        }

        if (section.items && section.items.length) {
            content.appendChild(createBulletList(section.items));
        }

        if (section.rules && section.rules.length) {
            content.appendChild(createRuleBox(section.rules));
        }

        wrap.appendChild(badge);
        wrap.appendChild(content);
        return wrap;
    }

    function renderViewAccountConfigSections() {
        var container = document.getElementById('viewAccountConfigSections');
        if (!container) return;
        container.innerHTML = '';
        container.appendChild(createHeading('View: Config', 'view-config', 'View Accounts'));
        accountsContent.viewAccountConfigSections.forEach(function (section) {
            container.appendChild(createInfoCard(section));
        });
    }

    function renderUpdateAccountSections() {
        var container = document.getElementById('updateAccountSections');
        if (!container) return;
        container.innerHTML = '';
        container.appendChild(createHeading('Update: Sections', 'update-sections', 'View Accounts'));
        accountsContent.updateAccountSections.forEach(function (section, index) {
            container.appendChild(createInfoStepCard(index + 1, section));
        });

        var updateAssessment = accountsContent.updateAssessmentSection;
        if (updateAssessment) {
            var standaloneWrap = document.createElement('div');
            standaloneWrap.className = 'mt-6';
            standaloneWrap.appendChild(createHeading(updateAssessment.title, updateAssessment.id, 'View Accounts'));

            var detail = document.createElement('p');
            detail.className = 'text-sm text-slate-600 leading-relaxed mb-4';
            detail.textContent = updateAssessment.detail;
            standaloneWrap.appendChild(detail);

            if (updateAssessment.routeSteps && updateAssessment.routeSteps.length) {
                updateAssessment.routeSteps.forEach(function (route) {
                    var routeTitle = document.createElement('h4');
                    routeTitle.className = 'text-sm font-bold text-slate-900 mt-5 mb-3';
                    routeTitle.textContent = route.title;
                    standaloneWrap.appendChild(routeTitle);

                    route.steps.forEach(function (step, index) {
                        standaloneWrap.appendChild(createStepCard(index + 1, { title: 'Step ' + (index + 1), detail: step }));
                    });
                });
            }

            if (updateAssessment.rules && updateAssessment.rules.length) {
                standaloneWrap.appendChild(createRuleBox(updateAssessment.rules));
            }

            container.appendChild(standaloneWrap);
        }
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var links = Array.from(sidebar.querySelectorAll('a[data-target]'));
        var childLists = Array.from(sidebar.querySelectorAll('.sidebar-children'));

        links.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        childLists.forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;

        activeLink.classList.add('active', 'text-brand', 'font-semibold');

        var activeItem = activeLink.closest('.sidebar-item');
        while (activeItem) {
            var ownChildren = activeItem.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');

            var parentList = activeItem.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                activeItem = parentList.closest('.sidebar-item');
            } else {
                activeItem = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var targetIds = Array.from(sidebar.querySelectorAll('a[data-target]'))
            .map(function (link) { return link.dataset.target; })
            .filter(Boolean);

        var currentId = null;
        var offset = 120;

        targetIds.forEach(function (id) {
            var target = document.getElementById(id);
            if (!target) return;
            if (target.getBoundingClientRect().top <= offset) {
                currentId = id;
            }
        });

        return currentId || targetIds[0] || null;
    }

    function setupSidebarVisibility() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget() || (location.hash || '').replace('#', '');
            if (activeId) setSidebarBranch(activeId);
        }

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            link.addEventListener('click', function () {
                setSidebarBranch(this.dataset.target);
            });
        });

        updateFromScroll();
        window.addEventListener('hashchange', function () {
            setTimeout(updateFromScroll, 50);
        });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderAll() {
        renderSidebar();
        renderHierarchy();
        renderLegend();
        renderViewAccountsLegend();
        renderAccountRules();
        renderCreateAccountSections();
        renderViewAccounts();
        renderViewAccountConfigSections();
        renderUpdateAccountSections();
        renderAccessSteps();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { renderAll(); });
    } else {
        renderAll();
    }

    // expose for debugging
    global.__accountsContent = accountsContent;
})(window);
