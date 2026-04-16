(function (global) {
    'use strict';

    function setAriaExpanded(toggleButton, isExpanded) {
        if (!toggleButton) return;
        toggleButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    function getBackdrop() {
        var backdrop = document.getElementById('mainNavBackdrop');
        if (backdrop) return backdrop;

        backdrop = document.createElement('button');
        backdrop.type = 'button';
        backdrop.id = 'mainNavBackdrop';
        backdrop.className = 'site-nav__backdrop';
        backdrop.setAttribute('aria-label', 'Close navigation');
        document.body.appendChild(backdrop);
        return backdrop;
    }

    function setBodyLocked(isLocked) {
        document.body.classList.toggle('overflow-hidden', isLocked);
    }

    function closeMobileNav() {
        var toggleButton = document.getElementById('navToggle');
        var navContainer = document.getElementById('mainNav');
        if (!navContainer) return;
        var navList = navContainer.querySelector('.site-nav__list');
        var backdrop = getBackdrop();
        if (!navList) return;

        navList.classList.add('hidden');
        navList.classList.remove('mobile-open');
        backdrop.classList.remove('mobile-open');
        setAriaExpanded(toggleButton, false);
        setBodyLocked(false);
    }

    function openMobileNav() {
        var toggleButton = document.getElementById('navToggle');
        var navContainer = document.getElementById('mainNav');
        if (!navContainer) return;
        var navList = navContainer.querySelector('.site-nav__list');
        var backdrop = getBackdrop();
        if (!navList) return;

        navList.classList.remove('hidden');
        navList.classList.add('mobile-open');
        backdrop.classList.add('mobile-open');
        setAriaExpanded(toggleButton, true);
        setBodyLocked(true);

        var firstLink = navList.querySelector('a, button');
        if (firstLink) firstLink.focus();
    }

    function toggleMobileNav() {
        var toggleButton = document.getElementById('navToggle');
        var navContainer = document.getElementById('mainNav');
        if (!toggleButton || !navContainer) return;
        var navList = navContainer.querySelector('.site-nav__list');
        if (!navList) return;

        var isCurrentlyHidden = navList.classList.contains('hidden') && !navList.classList.contains('mobile-open');

        if (isCurrentlyHidden) {
            openMobileNav();
        } else {
            closeMobileNav();
            toggleButton.focus();
        }
    }

    function closeMobileNavOnLinkClick() {
        var navContainer = document.getElementById('mainNav');
        if (!navContainer) return;
        navContainer.addEventListener('click', function (clickEvent) {
            if (clickEvent.target.tagName === 'A') {
                var navList = navContainer.querySelector('.site-nav__list');
                if (navList && navList.classList.contains('mobile-open')) {
                    closeMobileNav();
                }
            }
        });
    }

    function bindNavToggle() {
        var toggleButton = document.getElementById('navToggle');
        if (!toggleButton) return;
        if (!toggleButton.hasAttribute('aria-expanded')) {
            toggleButton.setAttribute('aria-expanded', 'false');
        }
        toggleButton.addEventListener('click', toggleMobileNav);
        getBackdrop().addEventListener('click', closeMobileNav);
        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMobileNav();
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) closeMobileNav();
        });
    }

    function init() {
        bindNavToggle();
        closeMobileNavOnLinkClick();
    }

    global.sharedNav = {
        init: init,
        toggleNav: toggleMobileNav
    };

})(window);
