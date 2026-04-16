(function () {
    'use strict';

    var LG_BREAKPOINT = 1024;

    function isDesktop() {
        return window.innerWidth >= LG_BREAKPOINT;
    }

    function setBodyLocked(isLocked) {
        document.body.classList.toggle('overflow-hidden', isLocked);
    }

    function initManualNav() {
        var sidebarList = document.getElementById('docSidebarList');
        if (!sidebarList) return;

        var aside = sidebarList.closest('aside');
        var nav = sidebarList.closest('nav');
        if (!aside || !nav) return;

        var toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'lg:hidden fixed bottom-5 right-5 z-[65] inline-flex h-12 w-12 items-center justify-center rounded-lg bg-brand text-white shadow-lg shadow-slate-300/70 transition-colors hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-red-200';
        toggle.setAttribute('aria-label', 'Open page navigation');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>';

        var backdrop = document.createElement('button');
        backdrop.type = 'button';
        backdrop.className = 'hidden lg:hidden fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm';
        backdrop.setAttribute('aria-label', 'Close page navigation');

        var closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'lg:hidden mb-4 inline-flex w-full items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700';
        closeButton.innerHTML = '<span>On this page</span><svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/></svg>';
        nav.insertBefore(closeButton, nav.firstChild);

        aside.classList.add('manual-sidebar');
        aside.classList.add('z-[70]');

        document.body.appendChild(backdrop);
        document.body.appendChild(toggle);

        function applyDesktopState() {
            aside.style.display = '';
            aside.style.position = '';
            aside.style.inset = '';
            aside.style.width = '';
            aside.style.maxWidth = '';
            aside.style.padding = '';
            aside.style.background = '';
            aside.style.boxShadow = '';
            aside.style.overflowY = '';

            nav.style.position = '';
            nav.style.top = '';
            nav.style.height = '';
            nav.style.overflowY = '';

            backdrop.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            setBodyLocked(false);
        }

        function applyMobileClosedState() {
            aside.style.display = 'none';
            aside.style.position = 'fixed';
            aside.style.inset = '0 auto 0 0';
            aside.style.width = '20rem';
            aside.style.maxWidth = '86vw';
            aside.style.padding = '1rem';
            aside.style.background = '#f8fafc';
            aside.style.boxShadow = '0 20px 50px rgba(15, 23, 42, 0.28)';
            aside.style.overflowY = 'auto';

            nav.style.position = 'static';
            nav.style.top = 'auto';
            nav.style.height = '100%';
            nav.style.overflowY = 'auto';

            backdrop.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            setBodyLocked(false);
        }

        function openMobileNav() {
            if (isDesktop()) return;
            aside.style.display = 'block';
            backdrop.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
            setBodyLocked(true);
        }

        function closeMobileNav() {
            if (isDesktop()) return;
            aside.style.display = 'none';
            backdrop.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
            setBodyLocked(false);
        }

        function syncLayoutMode() {
            if (isDesktop()) {
                applyDesktopState();
            } else {
                applyMobileClosedState();
            }
        }

        toggle.addEventListener('click', function () {
            if (toggle.getAttribute('aria-expanded') === 'true') {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
        backdrop.addEventListener('click', closeMobileNav);
        closeButton.addEventListener('click', closeMobileNav);
        sidebarList.addEventListener('click', function (event) {
            if (event.target.closest('a')) closeMobileNav();
        });
        window.addEventListener('resize', syncLayoutMode);
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMobileNav();
        });

        syncLayoutMode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initManualNav);
    } else {
        initManualNav();
    }
})();
