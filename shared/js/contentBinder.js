(function (global) {
    'use strict';

    function createFeatureItem(item) {
        var li = document.createElement('li');
        li.className = 'features__item bg-white p-4 rounded-md border border-gray-100 opacity-0 translate-y-3';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'w-full text-left';
        btn.textContent = item.title || 'Feature';
        btn.setAttribute('data-target', item.target || '');

        // Navigate when clicked — pages are expected at pages/<target>/index.html
        btn.addEventListener('click', function () {
            var t = btn.getAttribute('data-target');
            if (!t) return;
            window.location.href = 'pages/' + t + '/index.html';
        });

        li.appendChild(btn);
        return li;
    }

    function fillHero(data) {
        if (!data || !data.hero) return;
        var h = document.getElementById('heroTitle');
        var s = document.getElementById('heroSubtitle');
        var c = document.getElementById('heroCta');
        if (h) h.textContent = data.hero.title;
        if (s) s.textContent = data.hero.subtitle;
        if (c) c.textContent = data.hero.ctaText;
    }

    function fillFeatures(data) {
        if (!data || !data.features) return;
        var list = document.getElementById('featuresList');
        if (!list) return;
        list.innerHTML = '';
        data.features.forEach(function (f) {
            var li = createFeatureItem(f);
            list.appendChild(li);
        });
    }

    function fillAbout(data) {
        var node = document.getElementById('aboutContent');
        if (!node || !data) return;
        node.textContent = data.about || '';
    }

    function fillContact(data) {
        var node = document.getElementById('contactContent');
        if (!node || !data) return;
        node.textContent = data.contact || '';
    }

    function fillFooter() {
        var yearNode = document.getElementById('footerYear');
        if (!yearNode) return;
        yearNode.textContent = new Date().getFullYear();
    }

    function init(data) {
        fillHero(data);
        fillFeatures(data);
        fillAbout(data);
        fillContact(data);
        fillFooter();
    }

    global.sharedContentBinder = {
        init: init
    };

})(window);
