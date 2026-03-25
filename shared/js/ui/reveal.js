(function (global) {
    'use strict';

    function revealElementWithTransition(el) {
        if (!el) return;
        // respect reduced motion
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        el.classList.remove('opacity-0', 'translate-y-3');
        if (!reduce) {
            el.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-200', 'ease-out');
        } else {
            el.classList.add('opacity-100', 'translate-y-0');
        }
    }

    function runIntroAnimation() {
        var selectors = ['#hero .hero__content', '#features', '#about', '#contact'];
        selectors.forEach(function (sel, index) {
            var el = document.querySelector(sel);
            if (!el) return;
            setTimeout(function () {
                revealElementWithTransition(el);
            }, 120 * index);
        });
    }

    function setupScrollReveal() {
        if (!('IntersectionObserver' in window)) return;
        var revealNodes = document.querySelectorAll('.features__item, .about, .contact');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    revealElementWithTransition(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealNodes.forEach(function (n) { observer.observe(n); });
    }

    function init() {
        runIntroAnimation();
        setupScrollReveal();
    }

    global.sharedReveal = {
        init: init
    };

})(window);
