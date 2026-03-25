(function (global) {
    'use strict';

    function setAria(toggle, expanded) {
        if (!toggle) return;
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function toggleNav() {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;
        var list = nav.querySelector('.site-nav__list');
        if (!list) return;

        var isHidden = list.classList.contains('hidden');
        if (isHidden) {
            list.classList.remove('hidden');
            setAria(toggle, true);
            // move focus into first link
            var first = list.querySelector('a, button');
            if (first) first.focus();
        } else {
            list.classList.add('hidden');
            setAria(toggle, false);
            toggle.focus();
        }
    }

    function bind() {
        var toggle = document.getElementById('navToggle');
        if (!toggle) return;
        // ensure initial aria-expanded
        if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
        toggle.addEventListener('click', toggleNav);
    }

    function init() {
        bind();
    }

    global.sharedNav = {
        init: init,
        toggleNav: toggleNav
    };

})(window);
