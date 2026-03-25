// assessmentBehavior: Behavior and animations for Assessment Management page
(function (global) {
    const assessmentBehavior = {
        initBehavior: function () {
            attachNavToggle();
            runIntroReveal();
            observeSectionReveals();
            touchupFooterYear();
        }
    };

    function attachNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            const navList = document.querySelector('.site-nav__list');
            if (!navList) return;
            navList.classList.toggle('is-open');
        });
    }

    function runIntroReveal() {
        const hero = document.querySelector('.hero__content');
        if (!hero) return;
        hero.classList.add('is-intro');
        setTimeout(() => hero.classList.remove('is-intro'), 900);
    }

    function observeSectionReveals() {
        const revealTargets = document.querySelectorAll('[data-reveal]');
        if (!revealTargets.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealTargets.forEach(t => observer.observe(t));
    }

    function touchupFooterYear() {
        const el = document.getElementById('footerYearSpan');
        if (!el) return;
        const year = new Date().getFullYear();
        el.textContent = `© GoPick ${year}`;
    }

    global.assessmentBehavior = assessmentBehavior;
})(window);
