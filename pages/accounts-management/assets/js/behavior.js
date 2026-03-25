// accountsBehavior: Behavior and animations for Accounts Management page
(function (global) {
    const accountsBehavior = {
        initBehavior: function () {
            attachNavToggle();
            runIntroReveal();
            observeSectionReveals();
            touchupFooterYear();
        }
    };

    // Nav toggle
    function attachNavToggle() {
        const toggle = document.querySelector('.nav-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            const navList = document.querySelector('.site-nav__list');
            if (!navList) return;
            navList.classList.toggle('is-open');
        });
    }

    // Simple intro reveal: add a class to hero content
    function runIntroReveal() {
        const hero = document.querySelector('.hero__content');
        if (!hero) return;
        hero.classList.add('is-intro');
        // remove intro class after animation
        setTimeout(() => hero.classList.remove('is-intro'), 900);
    }

    // Intersection observer to reveal elements with [data-reveal]
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
        const el = document.getElementById('footerYear');
        if (!el) return;
        const year = new Date().getFullYear();
        el.textContent = `© Company ${year}`;
    }

    // Expose globally
    global.accountsBehavior = accountsBehavior;
})(window);
