(function (global) {
    'use strict';

    function revealElementWithTransition(targetElement) {
        if (!targetElement) return;
        var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        targetElement.classList.remove('opacity-0', 'translate-y-4');
        if (!reduceMotion) {
            targetElement.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-500', 'ease-out');
        } else {
            targetElement.classList.add('opacity-100', 'translate-y-0');
        }
    }

    function runIntroAnimation() {
        var introSelectors = [
            '#hero .hero__content',
            '#features > div > .opacity-0',
            '#about',
            '#roles',
            '#modules',
            '#hierarchy',
            '#access'
        ];
        introSelectors.forEach(function (selector, selectorIndex) {
            var matchedElement = document.querySelector(selector);
            if (!matchedElement) return;
            setTimeout(function () {
                revealElementWithTransition(matchedElement);
            }, 150 * selectorIndex);
        });
    }

    function setupScrollReveal() {
        if (!('IntersectionObserver' in window)) return;
        var revealTargets = document.querySelectorAll('#featuresList > li, #about, #roles, #modules, #hierarchy, #access, #modulesList > div');
        var scrollObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    revealElementWithTransition(entry.target);
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealTargets.forEach(function (targetNode) {
            scrollObserver.observe(targetNode);
        });
    }

    function init() {
        runIntroAnimation();
        setupScrollReveal();
    }

    global.sharedReveal = {
        init: init
    };

})(window);
