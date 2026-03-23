/*
  Behavior Layer: assets/js/behavior.js
  - Binds UI interactions and runs small animations
  - Uses clear verb-named functions and one-level abstraction
*/
(function (global) {
    'use strict';

    function toggleNav() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        const list = nav.querySelector('.site-nav__list');
        if (!list) return;
        // toggle Tailwind 'hidden' utility for small screens
        list.classList.toggle('hidden');
    }

    function bindNavInteractions() {
        const toggle = document.getElementById('navToggle');
        if (!toggle) return;
        toggle.addEventListener('click', toggleNav);
    }

    function revealElementWithTransition(el) {
        if (!el) return;
        // remove initial hidden state classes if present
        el.classList.remove('opacity-0', 'translate-y-3');
        // add visible state classes (Tailwind)
        el.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-200', 'ease-out');
    }

    function runIntroAnimation() {
        const selectors = ['#hero .hero__content', '#features', '#about', '#contact'];
        selectors.forEach(function (sel, index) {
            const el = document.querySelector(sel);
            if (!el) return;
            setTimeout(function () {
                revealElementWithTransition(el);
            }, 120 * index);
        });
    }

    function setupScrollReveal() {
        // lightweight reveal on scroll using IntersectionObserver
        if (!('IntersectionObserver' in window)) return;
        const revealNodes = document.querySelectorAll('.features__item, .about, .contact');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    revealElementWithTransition(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealNodes.forEach(function (n) { observer.observe(n); });
    }

    function initBehavior() {
        bindNavInteractions();
        runIntroAnimation();
        setupScrollReveal();
    }

    // Initialize when DOM ready; ensure data layer runs first
    document.addEventListener('DOMContentLoaded', function () {
        if (global.gopickDataLayer && typeof global.gopickDataLayer.init === 'function') {
            global.gopickDataLayer.init();
        }
        initBehavior();
    });

    // expose for testing/debugging
    global.gopickBehavior = {
        initBehavior: initBehavior,
        toggleNav: toggleNav
    };

})(window);
