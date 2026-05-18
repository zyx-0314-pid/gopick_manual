// meters data filler - content derived from docs/meters-management.md
(function (global) {
    'use strict';

    const metersContent = {
        title: 'Meters Management',
        legends: [
            '(Admin) - Super Admin IT or Super Admin ASD',
            '(Accounts) - Distributor, Sub Distributor, Client Account, Sub-Account'
        ],
        sections: [
            {
                id: 'meter-request',
                title: 'Meter Request',
                description: 'View and manage meter requests from lower hierarchy accounts.',
                children: [
                    {
                        id: 'approve-or-reject-request',
                        title: 'Approve Or Reject Request',
                        description: 'Review pending meter requests and approve or reject the request.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Request'] }
                        ],
                        steps: [
                            'Open Meters > Meter Request.',
                            'Select the request.',
                            'Review the request details.',
                            'Click Approve or Reject.'
                        ],
                        rules: [
                            'Requests require approval before meter movement occurs.',
                            'Request approval deducts meters from the approving account.',
                            'Requests may only be approved by authorized higher hierarchy accounts.',
                            'Requests cannot be edited after submission.',
                            'Partial approval is not supported.',
                            'Requests may be cancelled by the requester or higher hierarchy accounts.'
                        ],
                        expectedResults: [
                            'The request status updates.',
                            'Meter balances update after approval.',
                            'A request history log is created.'
                        ]
                    }
                ]
            },
            {
                id: 'order-meters',
                title: 'Order Meters',
                description: 'Request meters from higher hierarchy accounts.',
                groups: [
                    { title: 'Access Path', items: ['Meters > Order Meters'] }
                ],
                steps: [
                    'Open Meters > Order Meters.',
                    'Enter the requested meter value.',
                    'Click Send Meter Order.'
                ],
                rules: [
                    'Meter requests follow hierarchy authority rules.',
                    'Requests require approval before meter balances change.'
                ],
                expectedResults: [
                    'The meter request is added to the request list.',
                    'Higher hierarchy accounts can review the request.'
                ]
            },
            {
                id: 'transfer-meters',
                title: 'Transfer Meters',
                description: 'Transfer meter balances to allowed accounts.',
                groups: [
                    {
                        title: 'Access Paths',
                        items: [
                            'Meters > Transfer Meters',
                            'Meters > Meter Records > View Meter > Transfer Meter'
                        ]
                    }
                ],
                steps: [
                    'Open Transfer Meters.',
                    'Select Source Account.',
                    'Review the loaded Available Meters.',
                    'Enter the Meter Value.',
                    'Select Destination Account.',
                    'Click Transfer Meter.'
                ],
                rules: [
                    'Transfers are immediate and do not require approval.',
                    'Transfer amount cannot exceed the available balance.',
                    'Transfers cannot cause balance < 0.',
                    'Standard accounts may transfer only to descendant accounts.',
                    'Cross-branch transfers are restricted to Super Admins.'
                ],
                expectedResults: [
                    'The source account balance decreases.',
                    'The destination account balance increases.',
                    'A transfer log entry is created.'
                ]
            },
            {
                id: 'meter-records',
                title: 'Meter Records',
                description: 'View account meter balances, logs, and meter-related actions.',
                groups: [
                    { title: 'Access Path', items: ['Meters > Meter Records'] }
                ],
                children: [
                    {
                        id: 'view-meter',
                        title: 'View Meter',
                        description: 'View meter balance and meter details for the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > View Meter'] }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click View Meter.'
                        ],
                        rules: [
                            'Visibility depends on account hierarchy.',
                            'Higher hierarchy accounts may view descendant account meters.'
                        ],
                        expectedResults: [
                            'The selected account meter details are displayed.'
                        ]
                    },
                    {
                        id: 'transfer-meter',
                        title: 'Transfer Meter',
                        description: 'Transfer meters directly from the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > View Meter > Transfer Meter'] }
                        ],
                        steps: [
                            'Open View Meter.',
                            'Click Transfer Meter.',
                            'Enter transfer details.',
                            'Click Transfer Meter.'
                        ],
                        rules: [
                            'Transfer restrictions follow hierarchy authority rules.',
                            'Transfers cannot cause balance < 0.'
                        ],
                        expectedResults: [
                            'Meter balances update immediately.',
                            'A transfer log entry is created.'
                        ]
                    },
                    {
                        id: 'view-meter-log',
                        title: 'View Meter Log',
                        description: 'View meter history and meter-related activities for the selected account.',
                        groups: [
                            {
                                title: 'Access Paths',
                                items: [
                                    'Meters > Meter Records > View Meter Log',
                                    'Meters > Meter Records > View Meter > View Meter Log'
                                ]
                            }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click View Meter Log.'
                        ],
                        rules: [
                            'Meter log visibility follows hierarchy authority.',
                            'Higher hierarchy accounts may view descendant logs.',
                            'Accounts may view their own logs.',
                            'Archived and deactivated account logs remain visible in history.'
                        ],
                        expectedResults: [
                            'Meter activity history is displayed.'
                        ]
                    },
                    {
                        id: 'update-meter-balance',
                        title: 'Update Meter Balance',
                        description: 'Add or deduct meter balances for the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > Update Meter Balance'] }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click Update Meter Balance.',
                            'Enter the adjustment value.',
                            'Save the update.'
                        ],
                        rules: [
                            'Meter balances cannot become < 0.',
                            'Higher hierarchy accounts may update descendant account balances.',
                            'Super Admins are not meter-deducted during updates.'
                        ],
                        expectedResults: [
                            'The selected account balance updates.',
                            'A meter adjustment log entry is created.'
                        ]
                    }
                ]
            },
            {
                id: 'meter-consumption',
                title: 'Meter Consumption',
                description: 'Meters are consumed during report generation. Generated reports may later be viewed, downloaded, emailed, or revisited without additional meter deduction.',
                rules: [
                    'Meter deduction occurs once per candidate per assessment.',
                    'Generated reports remain accessible after creation.',
                    'Higher hierarchy accounts may view descendant reports.'
                ],
                expectedResults: [
                    'Meter balances decrease after report generation.',
                    'Generated reports become available for viewing and download.'
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

    function createCallout(title, items, kind) {
        const wrap = document.createElement('div');
        const isRules = kind === 'rules';
        wrap.className = isRules
            ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
            : 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';

        const heading = document.createElement('h3');
        heading.className = isRules ? 'font-semibold text-amber-900 mb-3' : 'font-semibold text-emerald-900 mb-3';
        heading.textContent = title;

        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
        return wrap;
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

    function renderSectionBody(section, target) {
        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsTitle = document.createElement('h3');
            stepsTitle.className = 'mt-5 mb-3 font-semibold text-slate-900';
            stepsTitle.textContent = 'How To Use';
            target.appendChild(stepsTitle);

            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            target.appendChild(createCallout('Rules', section.rules, 'rules'));
        }

        if (section.expectedResults && section.expectedResults.length) {
            target.appendChild(createCallout('Expected Result', section.expectedResults, 'expected'));
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

        if (section.children && section.children.length) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderLegends(root) {
        if (!metersContent.legends || !metersContent.legends.length) return;

        const legendsWrap = document.createElement('div');
        legendsWrap.className = 'mb-8 rounded-lg border border-slate-100 bg-slate-50 p-5';

        const heading = document.createElement('h2');
        heading.className = 'font-semibold text-slate-900 mb-3';
        heading.textContent = 'Legends';
        legendsWrap.appendChild(heading);
        legendsWrap.appendChild(createBulletList(metersContent.legends));

        root.appendChild(legendsWrap);
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        renderLegends(root);

        metersContent.sections.forEach(function (section) {
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
        metersContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('active', 'text-brand', 'font-semibold');

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
            var activeId = getVisibleSidebarTarget() || (location.hash || '').replace('#', '');
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

    global.__metersContent = metersContent;
})(window);
