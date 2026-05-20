// meters governance data filler - interpreted from docs/domain-governance/meters.md
(function (global) {
    'use strict';

    const governanceContent = {
        title: 'Meters Governance',
        tldr: [
            'Meter is a hierarchy-governed operational credit used at assessment completion time.',
            'Deduction happens once per candidate per assessment on initial assessment completion only.',
            'Requests require approval; transfers are immediate and do not require approval.',
            'Negative balances are not allowed; operations are blocked when result is < 0.',
            'Standard accounts are hierarchy-scoped; cross-branch operations are Super Admin-only.',
            'Logs are system-generated, hierarchy-visible, and remain visible for archived/deactivated accounts.'
        ],
        sections: [
            {
                id: 'governance-foundations',
                title: 'Governance Foundations',
                description: 'Core governance model and hierarchy baseline for meter behavior.',
                children: [
                    {
                        id: 'overview',
                        title: 'Overview',
                        description: 'The Meter system manages operational credit balances used for assessment-related assessment completion and behaves as a hierarchy-governed operational credit and audit system.',
                        rules: [
                            'Visibility is hierarchy-based.',
                            'Transfer authority is hierarchy-based.',
                            'Request authority is hierarchy-based.',
                            'Consumption responsibility is hierarchy-based.'
                        ]
                    },
                    {
                        id: 'hierarchy-structure',
                        title: 'Hierarchy Structure',
                        hierarchyLevels: [
                            { name: 'Super Admin (IT)', level: 0, dotColor: 'bg-brand' },
                            { name: 'Super Admin (ASD)', level: 0, dotColor: 'bg-brand' },
                            { name: 'Distributor', level: 1, dotColor: 'bg-violet-500' },
                            { name: 'Administrator', level: 2, dotColor: 'bg-violet-500' },
                            { name: 'Sub Distributor', level: 2, dotColor: 'bg-orange-500' },
                            { name: 'Administrator', level: 3, dotColor: 'bg-orange-500' },
                            { name: 'Client Account', level: 3, dotColor: 'bg-lime-500' },
                            { name: 'Administrator', level: 4, dotColor: 'bg-lime-500' },
                            { name: 'Self Registered', level: 4, dotColor: 'bg-lime-500' },
                            { name: 'Sub-Account', level: 4, dotColor: 'bg-sky-300' },
                            { name: 'Administrator', level: 5, dotColor: 'bg-sky-300' },
                            { name: 'Self Registered', level: 5, dotColor: 'bg-sky-300' }
                        ],
                        groups: [
                            {
                                title: 'Hierarchy',
                                items: [
                                    'Super Admin (IT)',
                                    'Super Admin (ASD)',
                                    'Distributor',
                                    'Administrator',
                                    'Sub Distributor',
                                    'Administrator',
                                    'Client Account',
                                    'Administrator',
                                    'Self Registered',
                                    'Sub-Account',
                                    'Administrator',
                                    'Self Registered'
                                ]
                            }
                        ],
                        rules: [
                            'Higher hierarchy accounts have wider visibility and operational authority.',
                            'Higher hierarchy accounts have wider request approval and transfer scope.',
                            'Higher hierarchy accounts have wider report and meter log visibility.'
                        ]
                    },
                    {
                        id: 'meter-definition',
                        title: 'Meter Definition',
                        groups: [
                            {
                                title: 'Meters Are Consumed During',
                                items: ['Report generation']
                            },
                            {
                                title: 'Meters Are Not Consumed During',
                                items: ['Report viewing', 'Report downloading', 'Report emailing', 'Revisiting generated reports']
                            }
                        ],
                        expectedResults: ['Generated reports remain permanently accessible after creation.']
                    },
                    {
                        id: 'lifecycle-states',
                        title: 'Lifecycle States',
                        groups: [
                            { title: 'Account States', items: ['Expired', 'Deactivated', 'Archived', 'Deleted'] }
                        ]
                    }
                ]
            },
            {
                id: 'consumption-governance',
                title: 'Consumption Governance',
                description: 'Rules governing when, where, and how meter consumption occurs.',
                children: [
                    {
                        id: 'meter-consumption',
                        title: 'Meter Consumption',
                        children: [
                            {
                                id: 'consumption-trigger',
                                title: 'Consumption Trigger',
                                rules: [
                                    'Meter deduction occurs during initial assessment completion.',
                                    'Consumption occurs once per candidate per assessment.'
                                ]
                            },
                            {
                                id: 'consumption-ownership',
                                title: 'Consumption Ownership',
                                rules: ['Candidates consume meters from their owning/managing account.'],
                                groups: [
                                    {
                                        title: 'Accounts That May Own Candidates',
                                        items: ['Sub Distributor', 'Client Account', 'Sub-Account', 'Self Registered']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'generated-reports',
                        title: 'Generated Reports',
                        rules: [
                            'Generated reports remain permanently accessible.',
                            'Generated reports may be revisited repeatedly.',
                            'Generated reports may be downloaded and emailed multiple times without additional confirmed deduction.',
                            'Higher hierarchy accounts may access descendant reports.'
                        ]
                    },
                    {
                        id: 'consumption-types',
                        title: 'Consumption Types',
                        children: [
                            {
                                id: 'self-consumption',
                                title: 'Self Consumption',
                                rules: ['Consumes meters from own balance.']
                            },
                            {
                                id: 'parent-consumption',
                                title: 'Parent Consumption',
                                rules: [
                                    'Consumes meters using parent-related balance behavior.',
                                    'Observed behavior: some operations still validate local balance.'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'consumption-type-changes',
                        title: 'Consumption Type Changes',
                        children: [
                            {
                                id: 'self-to-parent',
                                title: 'Self to Parent',
                                rules: ['Existing meter balance is returned to the account performing the change.']
                            },
                            {
                                id: 'parent-to-self',
                                title: 'Parent to Self',
                                rules: ['Meter balance is deducted from the account performing the change.']
                            }
                        ]
                    }
                ]
            },
            {
                id: 'operations-governance',
                title: 'Operations Governance',
                description: 'Rules for request, transfer, visibility, and administrative meter operations.',
                children: [
                    {
                        id: 'meter-requests',
                        title: 'Meter Requests',
                        rules: [
                            'Lower hierarchy accounts may request meters from higher hierarchy accounts.',
                            'Higher hierarchy accounts may approve descendant account requests.'
                        ],
                        children: [
                            {
                                id: 'request-actions',
                                title: 'Request Actions',
                                groups: [
                                    { title: 'Supported', items: ['Approve', 'Reject', 'Cancel'] },
                                    { title: 'Not Supported', items: ['Edit after creation', 'Partial approval'] }
                                ]
                            },
                            {
                                id: 'request-approval',
                                title: 'Request Approval',
                                rules: ['Approving a request deducts meter balance from the approving account.', 'Super Admins are exempt from meter deduction.']
                            },
                            {
                                id: 'request-cancellation',
                                title: 'Request Cancellation',
                                rules: ['Requests may be cancelled by requestor or higher hierarchy accounts.', 'Cancelled requests remain visible historically.']
                            }
                        ]
                    },
                    {
                        id: 'meter-transfers',
                        title: 'Meter Transfers',
                        rules: ['Transfers move balances immediately.', 'Transfers do not require approval.'],
                        children: [
                            {
                                id: 'transfer-scope',
                                title: 'Transfer Scope',
                                groups: [
                                    { title: 'Standard Accounts May', items: ['Transfer downward', 'Transfer to descendant accounts', 'Transfer to self'] },
                                    { title: 'Standard Accounts Cannot', items: ['Transfer upward', 'Transfer cross-branch', 'Transfer to unrelated same-level accounts'] }
                                ]
                            },
                            {
                                id: 'super-admin-transfer-scope',
                                title: 'Super Admin Transfer Scope',
                                rules: ['Super Admins may transfer across all hierarchy branches and to any account.']
                            }
                        ]
                    },
                    {
                        id: 'meter-visibility',
                        title: 'Meter Visibility',
                        children: [
                            {
                                id: 'meter-logs',
                                title: 'Meter Logs',
                                rules: ['Accounts may view their own meter logs.', 'Higher hierarchy accounts may view descendant account logs.', 'Visibility follows hierarchy lineage.']
                            },
                            {
                                id: 'reports-visibility',
                                title: 'Reports',
                                rules: ['Higher hierarchy accounts may view descendant reports.', 'Cross-branch visibility is restricted unless Super Admin.']
                            }
                        ]
                    },
                    {
                        id: 'administrative-meter-operations',
                        title: 'Administrative Meter Operations',
                        rules: ['Higher hierarchy accounts may add or deduct meters.', 'Balance movement affects the account performing the update.']
                    }
                ]
            },
            {
                id: 'integrity-and-exceptions',
                title: 'Integrity and Exceptions',
                description: 'System integrity constraints, elevated-role behavior, exceptions, and unresolved domain gaps.',
                children: [
                    {
                        id: 'negative-balance-enforcement',
                        title: 'Negative Balance Enforcement',
                        rules: [
                            'Negative balances are not allowed.',
                            'Operations are blocked if resulting balance becomes < 0.',
                            'Applies to transfers, deductions, account creation, meter updates, consumption type changes, and assessment completion consumption.'
                        ]
                    },
                    {
                        id: 'super-admin-governance',
                        title: 'Super Admin Governance',
                        groups: [
                            { title: 'Super Admins', items: ['Are not meter-deducted', 'May create all account types', 'May transfer across all branches', 'May access all accounts', 'May access all reports', 'May access all logs'] },
                            { title: 'Still Restricted', items: ['Cannot perform operations causing balance < 0'] }
                        ]
                    },
                    {
                        id: 'self-registered-governance',
                        title: 'Self Registered Governance',
                        rules: ['Self Registered acts as both account and candidate.'],
                        groups: [
                            { title: 'Characteristics', items: ['Can own meters', 'Can receive transfers', 'Can consume meters', 'Cannot request meters', 'Cannot access admin-side pages'] }
                        ]
                    },
                    {
                        id: 'historical-log-governance',
                        title: 'Historical Log Governance',
                        rules: [
                            'Logs are system-generated, operationally persistent, and hierarchy-visible.',
                            'Archived and deactivated account logs remain historically visible.'
                        ]
                    },
                    {
                        id: 'confirmed-operational-characteristics',
                        title: 'Confirmed Operational Characteristics',
                        groups: [
                            {
                                title: 'System Currently Operates As',
                                items: [
                                    'Hierarchy-governed operational credit system',
                                    'Delegated consumption system',
                                    'Operational audit/history system',
                                    'Persistent report-access system'
                                ]
                            }
                        ],
                        rules: [
                            'Hierarchy-based authority is enforced.',
                            'Hierarchy-based visibility is enforced.',
                            'Strict non-negative balance integrity is enforced.',
                            'Persistent operational history is enforced.'
                        ]
                    },
                    {
                        id: 'gaps',
                        title: 'Gaps',
                        groups: [
                            {
                                title: 'Parent Consumption Account Creation Validation',
                                items: [
                                    'Accounts using Parent Consumption may fail account creation when the creator local meter balance is 0, even when parent balance is available.',
                                    'Some account creation validations still check local balance instead of parent-related consumption behavior.',
                                    'Observed impact: Sub Distributor accounts using parent consumption may become unable to create Client or Sub-Account records when local balance is 0.'
                                ]
                            },
                            {
                                title: 'Distributor Candidate Management Workflow',
                                items: [
                                    'Distributor candidate management workflow remains unclear on distributor side.',
                                    'Observed behavior: Admin accounts may create candidates under Distributor accounts.',
                                    'Observed behavior: Distributor accounts do not yet have a clearly confirmed candidate management workflow.',
                                    'Concern: Ownership and operational management responsibility becomes unclear for Distributor-managed candidates.'
                                ]
                            },
                            {
                                title: 'Deleted Account Meter Governance',
                                items: [
                                    'Meter behavior for Deleted accounts is not yet formally confirmed.',
                                    'Unclear areas: remaining meter balances, historical meter logs, generated reports, request history, transfer history, and visibility retention after deletion.',
                                    'Concern: historical audit consistency and balance ownership behavior may become inconsistent without formal deletion handling.'
                                ]
                            },
                            {
                                title: 'Archived, Deactivated, Expired Account Meter Governance',
                                items: [
                                    'Meter behavior for Archived, Deactivated, and Expired accounts is not yet formally confirmed.',
                                    'Unclear area: remaining meter balances.',
                                    'Concern: historical audit consistency and balance ownership behavior may become inconsistent without formally defined lifecycle-state handling.'
                                ]
                            },
                            {
                                title: 'Multi-Report Meter Deduction Behavior',
                                items: [
                                    'Current behavior deducts meters during initial assessment completion and generated reports remain reusable afterward.',
                                    'Additional deduction behavior for multiple reports under the same assessment is not yet formally confirmed.',
                                    'Unclear behavior: whether additional reports under the same assessment should trigger additional meter deduction.'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    function createStepCard(index, text) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';
        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;
        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = text;
        wrap.appendChild(badge);
        wrap.appendChild(detail);
        return wrap;
    }

    function createBulletList(items) {
        const list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'flex gap-2';
            const marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
            const text = document.createElement('span');
            text.textContent = item;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);
        });
        return list;
    }

    function renderGroups(container, groups) {
        groups.forEach(function (group) {
            const wrap = document.createElement('div');
            wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = group.title;
            wrap.appendChild(heading);
            wrap.appendChild(createBulletList(group.items || []));
            container.appendChild(wrap);
        });
    }

    function renderHierarchyTree(levels) {
        const wrap = document.createElement('div');
        wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
        levels.forEach(function (item) {
            const row = document.createElement('div');
            const indentRem = (item.level || 0) * 1.5;
            row.className = 'flex items-center gap-3 py-2';
            row.style.paddingLeft = indentRem + 'rem';

            if ((item.level || 0) > 0) {
                const line = document.createElement('div');
                line.className = 'w-6 h-px bg-slate-300';
                row.appendChild(line);
            }

            const dot = document.createElement('div');
            dot.className = 'w-3 h-3 rounded-full flex-shrink-0 ' + (item.dotColor || 'bg-slate-300');
            const label = document.createElement('span');
            label.className = 'text-sm font-medium text-slate-700';
            label.textContent = item.name;
            row.appendChild(dot);
            row.appendChild(label);
            wrap.appendChild(row);
        });
        return wrap;
    }

    function renderSectionBody(section, target) {
        if (section.hierarchyLevels && section.hierarchyLevels.length) {
            target.appendChild(renderHierarchyTree(section.hierarchyLevels));
        }

        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';
            const rulesHeading = document.createElement('h3');
            rulesHeading.className = 'font-semibold text-amber-900 mb-3';
            rulesHeading.textContent = 'Rules';
            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(section.rules));
            target.appendChild(rulesWrap);
        }

        if (section.expectedResults && section.expectedResults.length) {
            const expectedWrap = document.createElement('div');
            expectedWrap.className = 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';
            const expectedHeading = document.createElement('h3');
            expectedHeading.className = 'font-semibold text-emerald-900 mb-3';
            expectedHeading.textContent = 'Expected Result';
            expectedWrap.appendChild(expectedHeading);
            expectedWrap.appendChild(createBulletList(section.expectedResults));
            target.appendChild(expectedWrap);
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        if (eyebrowText) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = eyebrowText;
            fragment.appendChild(eyebrow);
        }
        const headingTag = headingLevel === 2 ? 'h2' : (headingLevel === 3 ? 'h3' : 'h4');
        const heading = document.createElement(headingTag);
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : (headingLevel === 3 ? 'text-lg font-bold text-slate-900' : 'text-base font-bold text-slate-900');
        heading.textContent = section.title;
        heading.setAttribute('tabindex', '-1');
        fragment.appendChild(heading);

        if (section.description) {
            const desc = document.createElement('p');
            desc.className = 'text-sm text-slate-500 mt-2 mb-5';
            desc.textContent = section.description;
            fragment.appendChild(desc);
        }

        return fragment;
    }

    function renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
        const sectionEl = document.createElement('section');
        sectionEl.className = isTopLevel ? 'mb-10' : 'mt-8 border-t border-slate-100 pt-6';
        sectionEl.appendChild(renderSectionHeader(section, headingLevel, eyebrowText));
        renderSectionBody(section, sectionEl);

        if (section.children) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderTldr(root) {
        const wrap = document.createElement('section');
        wrap.className = 'mb-10 rounded-lg border border-sky-100 bg-sky-50 p-5';
        const heading = document.createElement('h2');
        heading.className = 'font-semibold text-sky-900 mb-3';
        heading.textContent = 'TL;DR';
        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(governanceContent.tldr));
        root.appendChild(wrap);
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        renderTldr(root);
        governanceContent.sections.forEach(function (section) {
            root.appendChild(renderSectionTree(section, 2, null, true));
        });
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
        governanceContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('text-brand', 'font-semibold');

        var item = activeLink.closest('.sidebar-item');
        while (item) {
            var ownChildren = item.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');
            var parentList = item.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                item = parentList.closest('.sidebar-item');
            } else {
                item = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var links = Array.from(document.querySelectorAll('#docSidebarList a[data-target]'));
        var currentId = null;
        var offset = 120;

        links.forEach(function (link) {
            var target = document.getElementById(link.dataset.target);
            if (target && target.getBoundingClientRect().top <= offset) {
                currentId = link.dataset.target;
            }
        });

        return currentId || (links[0] && links[0].dataset.target);
    }

    function setupSidebarVisibility() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget();
            if (activeId) setSidebarBranch(activeId);
        }

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            link.addEventListener('click', function () {
                setSidebarBranch(this.dataset.target);
            });
        });

        updateFromScroll();
        window.addEventListener('hashchange', function () { setTimeout(updateFromScroll, 50); });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderAll() {
        renderSidebar();
        renderAllSections();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__metersGovernanceContent = governanceContent;
})(window);
