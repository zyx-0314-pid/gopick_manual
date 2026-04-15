// accounts data filler — hold page content in JS and render non-table content into the page
(function (global) {
    'use strict';

    const accountsContent = {
        title: 'Accounts Management',
        sections: [
            { id: 'rbac-matrix', title: 'RBAC Matrix' },
            { id: 'hierarchy', title: 'Account Hierarchy' },
            { id: 'legend', title: 'Legend' },
            { id: 'account-rules', title: 'Account Rules' },
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
                        id: 'config-drop-down',
                        title: 'Config: Drop Down',
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
                    }
                ]
            },
            { id: 'roles', title: 'Role Capabilities' },
            { id: 'access', title: 'Configuration Steps' }
        ],
        hierarchyLines: [
            'Super Admin (IT)',
            'Super Admin (ASD)',
            '  Distributor',
            '    Administrator',
            '    Self Registration',
            '    Sub Distributor',
            '      Administrator',
            '      Self Registration',
            '      Client',
            '        Administrator',
            '        Sub Client',
            '          Administrator',
            '          Self Registration'
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
        viewAccountSteps: [
            { title: 'Open View Accounts', detail: 'Go to Accounts Section, then open View Accounts.' },
            { title: 'Select and view an account', detail: 'Select Account, then choose View Account.' }
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
                        label: 'Checkbox for similar Business Address with Billing Address',
                        children: ['Billing Address is optional if checked and required if unchecked.']
                    },
                    'Expiry Date and Time',
                    'Actual Account Expiration',
                    'Status'
                ]
            },
            {
                id: 'assign-products',
                stepTitle: 'Assign Products',
                title: 'Assign Products',
                detail: 'Allows updating assessment meters for each assessment.',
                actions: ['Manage', 'Change Log', 'Update Assessment'],
                rules: ['Access is controlled via Admin RBAC policies of Update Assessment.']
            },
            {
                id: 'update-meter-management',
                stepTitle: 'Meter Management',
                title: 'Meter Management',
                detail: 'Allows updating assessment Meter Points for each account and changing Metering Management Type: Deduct from Self or Parent.',
                actions: ['View Meter Log'],
                rules: ['Self: Meter cannot be 0.', 'Parent: parent meter cannot be 0.']
            },
            {
                id: 'update-other-account-settings',
                stepTitle: 'Other Account Settings',
                title: 'Other Account Settings',
                detail: 'Allows updating additional account-related configurations, including but not limited to:',
                items: ['Account limits', 'Account expiration', 'Usage settings', 'Contract settings']
            },
            {
                id: 'review-account-details',
                stepTitle: 'Review Account Details',
                title: 'Review Account Details',
                detail: 'Allows reviewing account information before saving.'
            }
        ]
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

    function createSidebarItem(section, level) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';
        li.dataset.target = section.id;
        li.dataset.level = String(level);

        var a = document.createElement('a');
        var indentClass = level === 0 ? '' : (level === 1 ? ' pl-3 border-l border-slate-100' : ' pl-6 border-l border-slate-100');
        a.className = 'block text-slate-600 hover:text-brand transition-colors py-1' + indentClass;
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
        container.appendChild(createHeading('Config: Drop Down', 'config-drop-down', 'View Accounts'));
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
        renderAccountRules();
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
