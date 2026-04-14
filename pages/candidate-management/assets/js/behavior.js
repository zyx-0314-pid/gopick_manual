(function () {
    'use strict';

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function highlightActiveSidebarLink() {
        var sidebarLinks = document.querySelectorAll('#docSidebar a');
        if (!sidebarLinks.length) return;

        function updateActiveLink() {
            var currentHash = location.hash || '#legends';
            sidebarLinks.forEach(function (link) {
                link.classList.remove('text-brand', 'font-semibold');
                if (link.getAttribute('href') === currentHash) {
                    link.classList.add('text-brand', 'font-semibold');
                }
            });
        }

        updateActiveLink();
        window.addEventListener('hashchange', updateActiveLink);
    }

    function initCandidatePage() {
        setFooterYear();
        highlightActiveSidebarLink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCandidatePage);
    } else {
        initCandidatePage();
    }
})();
