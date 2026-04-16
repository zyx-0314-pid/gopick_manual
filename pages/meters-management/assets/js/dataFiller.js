// meters data filler - content derived from docs/meters-management.md
(function (global) {
    'use strict';

    const metersContent = {
        title: 'Meters Management',
        sections: [
            {
                id: 'meter-requests',
                title: 'Meter Requests',
                description: 'List requests from lower levels in the hierarchy and approve or reject them.',
                steps: [
                    'Open Meters Module, then select Meter Request.',
                    'Select the request to approve or reject.'
                ],
                actions: ['Approve', 'Reject']
            },
            {
                id: 'order-meters',
                title: 'Order Meters',
                description: 'Request meters from higher levels in the hierarchy and view request history.',
                steps: [
                    'Input the meter request value.',
                    'Click Send Meter Order.'
                ]
            },
            {
                id: 'transfer-meters',
                title: 'Transfer Meters',
                description: 'Transfer meter balance to child accounts.',
                steps: [
                    'Open Meters Module, then select Meter Request.',
                    'Select Source Account. Available Meters will load after selection.',
                    'Enter the Meter Value to transfer.',
                    'Select Destination Account.',
                    'Click Transfer Meter.'
                ]
            },
            {
                id: 'meter-records',
                title: 'Meter Records',
                description: 'View the list of child accounts and open meter details or meter logs.',
                children: [
                    {
                        id: 'view-meter',
                        title: 'View Meter',
                        description: 'View meter details for the selected account.'
                    },
                    {
                        id: 'view-meter-log',
                        title: 'View Meter Log',
                        description: 'View all meter logs.'
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

    function createPillList(items) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-3 flex flex-wrap gap-2';
        items.forEach(function (item) {
            const pill = document.createElement('span');
            pill.className = 'inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-brand ring-1 ring-red-100';
            pill.textContent = item;
            wrap.appendChild(pill);
        });
        return wrap;
    }

    function renderSectionBody(section, target) {
        if (section.actions && section.actions.length) {
            const label = document.createElement('p');
            label.className = 'mb-3 text-xs font-bold uppercase tracking-wider text-slate-400';
            label.textContent = 'Available actions';
            target.appendChild(label);
            target.appendChild(createPillList(section.actions));
        }

        if (section.steps && section.steps.length) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = section.actions && section.actions.length ? 'mt-5 space-y-4' : 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
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
        metersContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
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

    global.__metersContent = metersContent;
})(window);
