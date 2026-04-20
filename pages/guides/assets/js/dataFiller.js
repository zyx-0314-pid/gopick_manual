// manual guides data filler - rendered from docs/guides/*.md guidance
(function (global) {
    'use strict';

    const guideContent = {
        title: 'Manual Guides',
        sections: [
            {
                id: 'manual-authoring-guide',
                title: 'Manual Authoring Guide',
                description: 'How to create and update GoPick manual pages while keeping content, UI, and code uniform.',
                bullets: [
                    'Content truth: steps, rules, expected results, and explanations must stay accurate.',
                    'UI uniformity: manual pages must look and behave like the existing manuals.',
                    'Code uniformity: rendered pages should follow the same HTML, CSS, and JS structure.'
                ],
                children: [
                    {
                        id: 'where-to-put-files',
                        title: 'Where To Put Files',
                        description: 'Keep source docs, rendered pages, and guide docs in their expected locations.',
                        codeBlocks: [
                            {
                                label: 'Folder structure',
                                language: 'text',
                                code: [
                                    'docs/reports-management.md',
                                    'docs/guides/manual-authoring-guide.md',
                                    '',
                                    'pages/reports-management/index.html',
                                    'pages/reports-management/assets/css/style.css',
                                    'pages/reports-management/assets/css/layout.css',
                                    'pages/reports-management/assets/js/dataFiller.js',
                                    'pages/reports-management/assets/js/behavior.js'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'markdown-page-pattern',
                        title: 'Markdown Page Pattern',
                        description: 'Use Candidate Management as the baseline structure for manual source documents.',
                        codeBlocks: [
                            {
                                label: 'Markdown structure',
                                language: 'md',
                                code: [
                                    '# Module Name',
                                    '',
                                    '> Legends:',
                                    '> (Admin) - Super Admin IT or Super Admin ASD',
                                    '> (Accounts) - Distributor, Sub Distributor, Client, Sub-Client',
                                    '',
                                    '## Main Feature',
                                    'Plain description of what this feature does.',
                                    '',
                                    '### Workflow Or Subfeature',
                                    'Plain description of when this workflow is used.',
                                    '',
                                    '1. Open `Menu` > `Page`.',
                                    '2. Select the record or option.',
                                    '3. Click `Action`.',
                                    '',
                                    '> Rules:',
                                    '> - System rule or validation.',
                                    '> - Permission rule or display behavior.',
                                    '',
                                    '> Expected Result:',
                                    '> - What appears on screen.',
                                    '> - What data, report, status, email, or log changes.'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'html-page-layout',
                        title: 'HTML Page Layout',
                        description: 'Use this shell for new rendered manual pages. Change only the module title, label, description, and script paths as needed.',
                        codeBlocks: [
                            {
                                label: 'pages/<module>/index.html',
                                language: 'html',
                                code: [
                                    '<!doctype html>',
                                    '<html lang="en">',
                                    '<head>',
                                    '  <meta charset="utf-8" />',
                                    '  <meta name="viewport" content="width=device-width,initial-scale=1" />',
                                    '  <title>Module Name - GoPick</title>',
                                    '  <link rel="stylesheet" href="assets/css/style.css">',
                                    '  <link rel="stylesheet" href="assets/css/layout.css">',
                                    '  <link rel="icon" type="image/x-icon" href="../../favicon.ico">',
                                    '  <script src="https://cdn.tailwindcss.com"></script>',
                                    '</head>',
                                    '<body class="bg-slate-50 text-slate-800 antialiased">',
                                    '  <header class="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100" role="banner">',
                                    '    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">',
                                    '      <a href="../../index.html" class="inline-flex items-center" aria-label="GoPick home">',
                                    '        <img src="../../shared/img/gopick-logo.svg" alt="GoPick Solutions" class="h-10 w-auto">',
                                    '      </a>',
                                    '      <nav aria-label="Main navigation">',
                                    '        <ul class="flex items-center gap-6 text-sm font-medium text-slate-600">',
                                    '          <li><a class="hover:text-brand transition-colors" href="../../index.html">Home</a></li>',
                                    '          <li><a class="text-brand font-semibold" href="#" aria-current="page">Module Label</a></li>',
                                    '        </ul>',
                                    '      </nav>',
                                    '    </div>',
                                    '  </header>',
                                    '',
                                    '  <main class="pt-20 pb-16">',
                                    '    <div class="max-w-6xl mx-auto px-4 sm:px-6">',
                                    '      <div class="mb-10">',
                                    '        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900">Module Name</h1>',
                                    '        <p class="mt-3 text-lg text-slate-500 max-w-3xl">Short page purpose.</p>',
                                    '      </div>',
                                    '',
                                    '      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">',
                                    '        <aside class="hidden lg:block lg:col-span-1">',
                                    '          <nav id="docSidebar" class="sticky top-24 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">',
                                    '            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">On this page</h4>',
                                    '            <ul id="docSidebarList" class="space-y-2 text-sm"></ul>',
                                    '          </nav>',
                                    '        </aside>',
                                    '',
                                    '        <div class="lg:col-span-4 space-y-8">',
                                    '          <section id="docsContent" class="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">',
                                    '            <div id="section-render-root"></div>',
                                    '          </section>',
                                    '        </div>',
                                    '      </div>',
                                    '    </div>',
                                    '  </main>',
                                    '',
                                    '  <script src="assets/js/dataFiller.js" defer></script>',
                                    '  <script src="assets/js/behavior.js" defer></script>',
                                    '  <script src="../../shared/js/manualNav.js" defer></script>',
                                    '</body>',
                                    '</html>'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'css-layout-files',
                        title: 'CSS Layout Files',
                        description: 'Keep CSS minimal and page-specific. Reuse Tailwind and existing layout classes first.',
                        codeBlocks: [
                            {
                                label: 'assets/css/style.css',
                                language: 'css',
                                code: [
                                    '/* Minimal base styles for Module Name page */',
                                    ':root {',
                                    '    --brand: #e50914;',
                                    '}'
                                ].join('\n')
                            },
                            {
                                label: 'assets/css/layout.css',
                                language: 'css',
                                code: [
                                    'html {',
                                    '    scroll-behavior: smooth;',
                                    '}',
                                    '',
                                    '[tabindex="-1"]:focus {',
                                    '    outline: none;',
                                    '}'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'behavior-js-layout',
                        title: 'Behavior JS Layout',
                        description: 'Keep behavior JS small. Shared sidebar behavior belongs to shared/js/manualNav.js.',
                        codeBlocks: [
                            {
                                label: 'assets/js/behavior.js',
                                language: 'js',
                                code: [
                                    '(function () {',
                                    "    'use strict';",
                                    '',
                                    '    function setFooterYear() {',
                                    "        var yearSpan = document.getElementById('footerYearSpan');",
                                    '        if (yearSpan) yearSpan.textContent = new Date().getFullYear();',
                                    '    }',
                                    '',
                                    '    function initPage() {',
                                    '        setFooterYear();',
                                    '    }',
                                    '',
                                    "    if (document.readyState === 'loading') {",
                                    "        document.addEventListener('DOMContentLoaded', initPage);",
                                    '    } else {',
                                    '        initPage();',
                                    '    }',
                                    '})();'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'data-renderer-js-layout',
                        title: 'Data Renderer JS Layout',
                        description: 'The renderer should store structured content, render sections, and build the sidebar from the same content object.',
                        bullets: [
                            'Use rules for system behavior and render it as a yellow callout.',
                            'Use expectedResults for what QA and non-technical users should see after actions.',
                            'Do not add rules, expectedResults, notes, or technicalReference as sidebar items.'
                        ],
                        codeBlocks: [
                            {
                                label: 'assets/js/dataFiller.js pattern',
                                language: 'js',
                                code: [
                                    '// module data filler - content derived from docs/module-name.md',
                                    '(function (global) {',
                                    "    'use strict';",
                                    '',
                                    '    const moduleContent = {',
                                    "        title: 'Module Name',",
                                    '        sections: [',
                                    '            {',
                                    "                id: 'main-feature',",
                                    "                title: 'Main Feature',",
                                    "                description: 'Plain explanation of what this feature does.',",
                                    '                rules: [',
                                    "                    'System rule or validation behavior.'",
                                    '                ],',
                                    '                expectedResults: [',
                                    "                    'What appears after completing the steps.'",
                                    '                ],',
                                    '                steps: [',
                                    "                    'Open Menu, then Page.',",
                                    "                    'Select the record or option.',",
                                    "                    'Click Save.'",
                                    '                ]',
                                    '            }',
                                    '        ]',
                                    '    };',
                                    '',
                                    '    function renderAll() {',
                                    "        var root = document.getElementById('section-render-root');",
                                    "        var sidebar = document.getElementById('docSidebarList');",
                                    '        if (!root || !sidebar) return;',
                                    '        // Render sections and sidebar from moduleContent.',
                                    '    }',
                                    '',
                                    "    if (document.readyState === 'loading') {",
                                    "        document.addEventListener('DOMContentLoaded', renderAll);",
                                    '    } else {',
                                    '        renderAll();',
                                    '    }',
                                    '',
                                    '    global.__moduleContent = moduleContent;',
                                    '})(window);'
                                ].join('\n')
                            }
                        ]
                    }
                ]
            },
            {
                id: 'documentation-standard',
                title: 'Documentation Standard',
                description: 'The source-of-truth structure for steps, rules, expected results, notes, and technical references.',
                children: [
                    {
                        id: 'audience',
                        title: 'Audience',
                        description: 'Each manual page must support IT Developers, QA, and non-technical users in the same source of truth.',
                        bullets: [
                            'IT Developers need behavior, validations, dependencies, permissions, and edge cases.',
                            'QA needs repeatable test steps, rules, expected outcomes, and conditions to verify.',
                            'Non-technical users need plain instructions, labels to click, and simple explanations.'
                        ]
                    },
                    {
                        id: 'required-blocks',
                        title: 'Required Blocks',
                        description: 'Use these blocks consistently across manual pages.',
                        bullets: [
                            'Steps: what the user does in the UI.',
                            'Rules: system-enforced behavior that IT and QA should treat as truth.',
                            'Expected Result: what should appear or change after the action.',
                            'Notes: context, terminology, caveats, or non-rule explanation.',
                            'Technical Reference: internal modules or action names for developers.'
                        ]
                    },
                    {
                        id: 'review-checklist',
                        title: 'Review Checklist',
                        description: 'Check this before considering a manual page aligned.',
                        bullets: [
                            'The page has a clear module title and short purpose.',
                            'Major features use the same heading hierarchy as Candidate Management.',
                            'User actions are written as numbered steps.',
                            'Rules are in a Rules callout, not mixed into steps.',
                            'Expected results are documented for workflows that save, send, download, approve, reject, transfer, or update data.',
                            'The sidebar follows the content hierarchy and does not include callout-only blocks.'
                        ]
                    }
                ]
            },
            {
                id: 'non-technical-template',
                title: 'Non-Technical Template',
                description: 'A simpler template for clear instructions, important rules, and what to expect.',
                children: [
                    {
                        id: 'nontech-template',
                        title: 'Copy Template',
                        description: 'Use this when documenting a feature for readers who do not need internal module names.',
                        codeBlocks: [
                            {
                                label: 'Non-technical feature template',
                                language: 'md',
                                code: [
                                    '# Module Name',
                                    '',
                                    '## Feature Name',
                                    'Short explanation of what this feature is for.',
                                    '',
                                    '### How To Use',
                                    '1. Open `Menu` > `Page`.',
                                    '2. Select the record, account, candidate, assessment, or report.',
                                    '3. Fill in the required fields.',
                                    '4. Click `Save`, `Send`, `Download`, `Approve`, or the correct action.',
                                    '',
                                    '> Important Rules:',
                                    '> - Rule that the user must follow.',
                                    '> - Rule that the system enforces.',
                                    '> - Condition that makes an action unavailable.',
                                    '',
                                    '> What To Expect:',
                                    '> - What appears on screen.',
                                    '> - What changes after the action.',
                                    '> - What file, email, report, status, or log is created.'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'nontech-reports-example',
                        title: 'Example: Reports',
                        description: 'Example wording for non-technical report documentation.',
                        codeBlocks: [
                            {
                                label: 'Reports example',
                                language: 'md',
                                code: [
                                    '## Download Reports',
                                    'Download available assessment reports for selected candidates and assessments.',
                                    '',
                                    '1. Open `Report` > `Search Usage`.',
                                    '2. Select the assessments or candidates.',
                                    '3. In `Bulk Action`, select `Download Report`.',
                                    '',
                                    '> Important Rules:',
                                    '> - Reports are available only when a generated report exists.',
                                    '',
                                    '> What To Expect:',
                                    '> - Available reports download to your computer.',
                                    '> - If a report is not generated yet, it will not be available for download.'
                                ].join('\n')
                            }
                        ]
                    }
                ]
            }
        ]
    };

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

    function createCodeBlock(block) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 code-block';

        const label = document.createElement('div');
        label.className = 'border-b border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300';
        label.textContent = block.label || block.language || 'Example';

        const pre = document.createElement('pre');
        pre.className = 'overflow-x-auto p-4 text-xs leading-relaxed text-slate-100';

        const code = document.createElement('code');
        code.textContent = block.code || '';

        pre.appendChild(code);
        wrap.appendChild(label);
        wrap.appendChild(pre);
        return wrap;
    }

    function renderSectionBody(section, target) {
        if (section.bullets && section.bullets.length) {
            target.appendChild(createBulletList(section.bullets));
        }

        if (section.codeBlocks && section.codeBlocks.length) {
            section.codeBlocks.forEach(function (block) {
                target.appendChild(createCodeBlock(block));
            });
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

        const heading = document.createElement(headingLevel === 2 ? 'h2' : 'h3');
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : 'text-lg font-bold text-slate-900';
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
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 3), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        guideContent.sections.forEach(function (section) {
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
        guideContent.sections.forEach(function (section) {
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
            if (target && target.getBoundingClientRect().top <= offset) currentId = link.dataset.target;
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

    global.__guideContent = guideContent;
})(window);
