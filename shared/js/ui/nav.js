(function (global) {
    'use strict';

    function setAriaExpanded(toggleButton, isExpanded) {
        if (!toggleButton) return;
        toggleButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    function toggleMobileNav() {
        var toggleButton = document.getElementById('navToggle');
        var navContainer = document.getElementById('mainNav');
        if (!toggleButton || !navContainer) return;
        var navList = navContainer.querySelector('.site-nav__list');
        if (!navList) return;

        var isCurrentlyHidden = navList.classList.contains('hidden') && !navList.classList.contains('mobile-open');

        if (isCurrentlyHidden) {
            navList.classList.remove('hidden');
            navList.classList.add('mobile-open');
            setAriaExpanded(toggleButton, true);
            var firstLink = navList.querySelector('a, button');
            if (firstLink) firstLink.focus();
        } else {
            navList.classList.add('hidden');
            navList.classList.remove('mobile-open');
            setAriaExpanded(toggleButton, false);
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
                    navList.classList.add('hidden');
                    navList.classList.remove('mobile-open');
                    var toggleButton = document.getElementById('navToggle');
                    setAriaExpanded(toggleButton, false);
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
