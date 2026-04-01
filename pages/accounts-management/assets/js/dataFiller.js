// accounts data filler — hold page content in JS and render non-table content into the page
(function (global) {
    'use strict';

    const accountsContent = {
        title: 'Accounts Management',
        sections: [
            { id: 'rbac-matrix', title: 'RBAC Matrix' },
            { id: 'hierarchy', title: 'Account Hierarchy' },
            { id: 'legend', title: 'Legend' },
            { id: 'roles', title: 'Role Capabilities' },
            { id: 'access', title: 'Configuration Steps' }
        ],
        hierarchyLines: [
            'Super Admin (IT)',
            '  Administrator (ASD)',
            '    Distributor',
            '      Self Registration',
            '      Sub Distributor',
            '        Self Registration',
            '        Client Account',
            '          Sub Account',
            '            Self Registration'
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

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        accountsContent.sections.forEach(function (section) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.className = 'block text-slate-600 hover:text-brand transition-colors py-1';
            a.href = '#' + section.id;
            a.textContent = section.title;
            li.appendChild(a);
            list.appendChild(li);
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

    function renderAll() {
        renderSidebar();
        renderHierarchy();
        renderLegend();
        renderAccessSteps();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { renderAll(); });
    } else {
        renderAll();
    }

    // expose for debugging
    global.__accountsContent = accountsContent;
})(window);
