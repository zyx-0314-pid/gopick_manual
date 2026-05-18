(function () {
    'use strict';

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initReportsPage() {
        setFooterYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReportsPage);
    } else {
        initReportsPage();
    }
})();
