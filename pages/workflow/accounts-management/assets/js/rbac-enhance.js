// Minimal enhancer: color-code cells and highlight sidebar links
document.addEventListener('DOMContentLoaded', function () {
    try {
        const table = document.querySelector('.rbac-table');
        if (table) {
            // Add classes to cells based on their text content
            table.querySelectorAll('tbody td').forEach(td => {
                const txt = (td.textContent || '').trim().toUpperCase();
                if (txt === 'X') td.classList.add('rbac-x');
                else if (txt === 'C') td.classList.add('rbac-c');
                else if (txt === 'N') td.classList.add('rbac-n');
                else if (txt === '-' || txt === '') td.classList.add('rbac-dash');
            });
            // Ensure header cells in role columns are centered visually
            Array.from(table.querySelectorAll('thead th')).forEach((th, i) => {
                if (i >= 4) th.style.textAlign = 'center';
            });
        }

        // Sidebar: highlight active nav link matching hash
        function updateActiveNav() {
            const links = document.querySelectorAll('aside nav a');
            links.forEach(a => a.classList.remove('active'));
            const hash = location.hash || '#rbac-matrix';
            const active = document.querySelector('aside nav a[href="' + hash + '"]');
            if (active) active.classList.add('active');
        }
        updateActiveNav();
        window.addEventListener('hashchange', updateActiveNav);
    } catch (e) { console.warn('rbac-enhance failed', e); }
});
