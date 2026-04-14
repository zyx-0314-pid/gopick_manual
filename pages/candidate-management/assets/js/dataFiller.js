// candidate data filler - content derived from docs/candidate-management.md
(function (global) {
    'use strict';

    const candidateContent = {
        title: 'Candidate Management',
        sections: [
            {
                id: 'legends',
                title: 'Legends',
                description: 'Role labels used throughout this guide.',
                groups: [
                    {
                        title: '(Admin)',
                        items: ['Super Admin IT or Super Admin ASD']
                    },
                    {
                        title: '(Accounts)',
                        items: ['Distributor, Sub Distributor, Client, or Sub-Client']
                    }
                ]
            },
            {
                id: 'schedule-candidate',
                title: 'Schedule Candidate',
                description: 'Choose the scheduling workflow and complete the candidate scheduling form.',
                children: [
                    {
                        id: 'schedule-type',
                        title: 'Schedule Type',
                        description: 'Choose the scheduling workflow based on how the candidate assessment will be handled.',
                        groups: [
                            {
                                title: 'Candidate Schedule',
                                items: ['Schedule multiple candidates with the same assessment.']
                            },
                            {
                                title: 'Data Encoding',
                                items: ['Schedule multiple candidates who took the assessment via paper and pen.']
                            }
                        ]
                    },
                    {
                        id: 'scheduling',
                        title: 'Scheduling',
                        description: 'Complete the candidate scheduling form from candidate information through final review.',
                        groups: [
                            {
                                title: '1. Candidate Information',
                                items: [
                                    'Select Account Name, which is the company where the candidate will be created. This is required.',
                                    'Input First Name, Last Name, Candidate Email, and Gender. These fields are required.'
                                ],
                                rules: [
                                    'Use one account name at a time.',
                                    'Avoid duplicate email addresses.'
                                ]
                            },
                            {
                                title: '2. Test Requirements',
                                items: [
                                    'Set Camera and Mic Requirements. This is required.',
                                    'Set Link Validity: Start Date, Time Start, Expiration Date, and Time Expiration. These fields are required; time fields are autofilled.',
                                    'Set Assessment Reminder using either reminder frequency by weekday checkbox or every number of days interval checkbox.',
                                    'Reminder Time is required and autofilled.',
                                    'Set Assessment Report Recipient using Candidate Email or Report Recipient Email.',
                                    'Use commas to add multiple report recipient emails.',
                                    'Set Assessment Invitation Email. This is required and autofilled; options include Candidate Email, Report Recipient, and Custom Email.',
                                    'If Custom Email is selected, fill in the Custom Assessment Invitation Email entry.',
                                    'Fill in Backup Email. This is required and autofilled.'
                                ]
                            },
                            {
                                title: '3. Assign Products',
                                items: ['Select Assessment.'],
                                rules: ['Select at least one assessment.']
                            },
                            {
                                title: '4. Review Candidate Details',
                                items: ['Review the candidate entry information before saving.']
                            }
                        ]
                    }
                ]
            },
            {
                id: 'view-candidates',
                title: 'View Candidates',
                description: 'View candidate assessments and add more assessments when needed.',
                children: [
                    {
                        id: 'view-assessments',
                        title: 'View Assessments',
                        description: 'View the assessments assigned to a candidate.',
                        steps: [
                            'Go to Candidates Section, then open the View Candidate page.',
                            'Select the candidate: Admins select Distributor Account, then select the candidate to view. Accounts select the candidate to view directly.',
                            'Open Actions, then select View Assessment.'
                        ],
                        rules: [
                            'Each single assessment is rendered as a standalone row.',
                            'Test batteries are represented by listing their associated single assessments, each labeled with a corresponding tag.'
                        ]
                    },
                    {
                        id: 'update-assessment',
                        title: 'Update Assessment',
                        description: 'Add more assessments to a candidate.',
                        steps: [
                            'Go to Candidates Section, then open the View Candidate page.',
                            'Select the candidate: Admins select Distributor Account, then select the candidate to view. Accounts select the candidate to view directly.',
                            'Open Actions, then select View Assessment.',
                            'Click Add Assessment.',
                            'Select the checkbox or radio boxes of assessments with their norms, types, and related options.',
                            'Click the Save button below.'
                        ],
                        rules: [
                            'When a single assessment is selected, all test batteries containing that assessment are locked.',
                            'When a test battery is selected, all single assessments included in that battery are locked.',
                            'When a test battery is selected, all other test batteries that share at least one common single assessment are also locked.'
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

    function createGroupStepCard(index, group) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        const content = document.createElement('div');
        content.className = 'min-w-0 flex-1';

        const heading = document.createElement('h3');
        heading.className = 'font-semibold text-slate-900 mb-2';
        heading.textContent = group.title.replace(/^\d+\.\s*/, '');
        content.appendChild(heading);
        content.appendChild(createBulletList(group.items || []));

        if (group.rules && group.rules.length) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
            const rulesHeading = document.createElement('h4');
            rulesHeading.className = 'font-semibold text-amber-900 mb-2';
            rulesHeading.textContent = 'Rules';
            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(group.rules));
            content.appendChild(rulesWrap);
        }

        wrap.appendChild(badge);
        wrap.appendChild(content);
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

            if (group.rules && group.rules.length) {
                const rulesWrap = document.createElement('div');
                rulesWrap.className = 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
                const rulesHeading = document.createElement('h4');
                rulesHeading.className = 'font-semibold text-amber-900 mb-2';
                rulesHeading.textContent = 'Rules';
                rulesWrap.appendChild(rulesHeading);
                rulesWrap.appendChild(createBulletList(group.rules));
                wrap.appendChild(rulesWrap);
            }

            container.appendChild(wrap);
        });
    }

    function renderSectionBody(section, target) {
        if (section.groups) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            if (section.id === 'scheduling') {
                section.groups.forEach(function (group, i) {
                    groupsWrap.appendChild(createGroupStepCard(i + 1, group));
                });
            } else {
                renderGroups(groupsWrap, section.groups);
            }
            target.appendChild(groupsWrap);
        }

        if (section.steps) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';
            const rulesHeading = document.createElement('h3');
            rulesHeading.className = 'font-semibold text-amber-900 mb-3';
            rulesHeading.textContent = 'Rules';
            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(section.rules));
            target.appendChild(rulesWrap);
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        const label = eyebrowText || section.eyebrow;
        if (label) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = label;
            fragment.appendChild(eyebrow);
        }

        const heading = document.createElement(headingLevel === 3 ? 'h3' : 'h2');
        heading.id = section.id;
        heading.className = headingLevel === 3 ? 'text-lg font-bold text-slate-900' : 'text-xl font-bold text-slate-900';
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

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        candidateContent.sections.forEach(function (section) {
            const sectionEl = document.createElement('section');
            sectionEl.className = 'mb-10';
            sectionEl.appendChild(renderSectionHeader(section, 2));
            renderSectionBody(section, sectionEl);

            if (section.children) {
                section.children.forEach(function (child) {
                    const childEl = document.createElement('section');
                    childEl.className = 'mt-8 border-t border-slate-100 pt-6';
                    childEl.appendChild(renderSectionHeader(child, 3, section.title));
                    renderSectionBody(child, childEl);
                    sectionEl.appendChild(childEl);
                });
            }

            root.appendChild(sectionEl);
        });
    }

    function createSidebarItem(section, level) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';

        var a = document.createElement('a');
        var indentClass = level === 0 ? '' : ' pl-3 border-l border-slate-100';
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
        candidateContent.sections.forEach(function (section) {
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
        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget();
            if (activeId) setSidebarBranch(activeId);
        }

        updateFromScroll();
        window.addEventListener('hashchange', function () { setTimeout(updateFromScroll, 50); });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function scrollToHash() {
        var id = (location.hash || '').replace('#', '');
        if (!id) return;
        var el = document.getElementById(id);
        if (el) {
            setTimeout(function () {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.focus && el.focus();
            }, 20);
        }
    }

    function renderAll() {
        renderSidebar();
        renderAllSections();
        scrollToHash();
        setupSidebarVisibility();
        window.addEventListener('hashchange', scrollToHash);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__candidateContent = candidateContent;
})(window);
