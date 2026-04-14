// candidate data filler - content derived from docs/candidate-management.md
(function (global) {
    'use strict';

    const candidateContent = {
        title: 'Candidate Management',
        sections: [
            {
                id: 'legends',
                title: 'Legends',
                eyebrow: 'Candidate Module',
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
                id: 'schedule-type',
                title: 'Schedule Type',
                eyebrow: 'Schedule Candidate',
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
                eyebrow: 'Schedule Candidate',
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
            },
            {
                id: 'view-assessments',
                title: 'View Assessments',
                eyebrow: 'View Candidates',
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
                eyebrow: 'View Candidates',
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

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        candidateContent.sections.forEach(function (section) {
            const sectionEl = document.createElement('section');
            sectionEl.className = 'mb-8';

            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = section.eyebrow;
            sectionEl.appendChild(eyebrow);

            const heading = document.createElement('h2');
            heading.id = section.id;
            heading.className = 'text-xl font-bold text-slate-900';
            heading.textContent = section.title;
            heading.setAttribute('tabindex', '-1');
            sectionEl.appendChild(heading);

            const desc = document.createElement('p');
            desc.className = 'text-sm text-slate-500 mt-2 mb-5';
            desc.textContent = section.description;
            sectionEl.appendChild(desc);

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
                sectionEl.appendChild(groupsWrap);
            }

            if (section.steps) {
                const stepsWrap = document.createElement('div');
                stepsWrap.className = 'space-y-4';
                section.steps.forEach(function (step, i) {
                    stepsWrap.appendChild(createStepCard(i + 1, step));
                });
                sectionEl.appendChild(stepsWrap);
            }

            if (section.rules) {
                const rulesWrap = document.createElement('div');
                rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';
                const rulesHeading = document.createElement('h3');
                rulesHeading.className = 'font-semibold text-amber-900 mb-3';
                rulesHeading.textContent = 'Rules';
                rulesWrap.appendChild(rulesHeading);
                rulesWrap.appendChild(createBulletList(section.rules));
                sectionEl.appendChild(rulesWrap);
            }

            root.appendChild(sectionEl);
        });
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        candidateContent.sections.forEach(function (section) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.className = 'block text-slate-600 hover:text-brand transition-colors py-1';
            a.href = '#' + section.id;
            a.textContent = section.title;
            li.appendChild(a);
            list.appendChild(li);
        });
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
        window.addEventListener('hashchange', scrollToHash);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__candidateContent = candidateContent;
})(window);
