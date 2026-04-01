(function (global) {
    'use strict';

    var ICON_SVG_MAP = {
        users: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        clipboard: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
        'user-check': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
        calendar: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        'bar-chart': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
        video: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>'
    };

    function getIconSvg(iconName) {
        return ICON_SVG_MAP[iconName] || ICON_SVG_MAP.clipboard;
    }

    function createFeatureCard(item) {
        var li = document.createElement('li');
        li.className = 'group bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-200 opacity-0 translate-y-4';

        var iconClass = 'feature-icon--' + (item.icon || 'default');
        var hasTarget = item.target && item.target.length > 0;
        var tag = hasTarget ? 'a' : 'div';

        var cardHtml = '<' + tag + (hasTarget ? ' href="pages/' + item.target + '/index.html"' : '') +
            ' class="flex flex-col h-full' + (hasTarget ? ' cursor-pointer' : '') + '">' +
            '<div class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 ' + iconClass + '">' +
            getIconSvg(item.icon) +
            '</div>' +
            '<h3 class="text-lg font-bold text-slate-900 mb-2' + (hasTarget ? ' group-hover:text-brand' : '') + ' transition-colors">' +
            (item.title || 'Feature') +
            '</h3>' +
            '<p class="text-sm text-slate-500 leading-relaxed flex-1">' +
            (item.description || '') +
            '</p>' +
            (hasTarget ? '<span class="mt-4 text-sm font-semibold text-brand flex items-center gap-1">View docs <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' : '') +
            '</' + tag + '>';

        li.innerHTML = cardHtml;
        return li;
    }

    function createRoleCard(role) {
        var div = document.createElement('div');
        var badgeClass = 'role-badge--' + role.name.toLowerCase().replace(/\s+/g, '-');

        div.className = 'bg-white rounded-xl border border-slate-100 p-6';
        div.innerHTML =
            '<div class="flex items-center gap-3 mb-3">' +
            '<span class="inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ' + badgeClass + '">' + role.name + '</span>' +
            '<span class="text-xs text-slate-400">' + role.scope + '</span>' +
            '</div>' +
            '<p class="text-sm text-slate-600 leading-relaxed">' + role.description + '</p>';

        return div;
    }

    function createModuleCard(mod) {
        var div = document.createElement('div');
        div.className = 'bg-white rounded-xl border border-slate-100 p-5';
        div.innerHTML =
            '<h3 class="text-base font-bold text-slate-900 mb-2">' + mod.name + '</h3>' +
            '<p class="text-sm text-slate-500 leading-relaxed">' + mod.description + '</p>';
        return div;
    }

    function fillHero(data) {
        if (!data || !data.hero) return;
        var titleNode = document.getElementById('heroTitle');
        var subtitleNode = document.getElementById('heroSubtitle');
        var ctaNode = document.getElementById('heroCta');
        if (titleNode) titleNode.textContent = data.hero.title;
        if (subtitleNode) subtitleNode.textContent = data.hero.subtitle;
        if (ctaNode) {
            ctaNode.firstChild.textContent = data.hero.ctaText;
        }
    }

    function fillFeatures(data) {
        if (!data || !data.features) return;
        var listNode = document.getElementById('featuresList');
        if (!listNode) return;
        listNode.innerHTML = '';
        data.features.forEach(function (featureData) {
            listNode.appendChild(createFeatureCard(featureData));
        });
    }

    function fillAbout(data) {
        var contentNode = document.getElementById('aboutContent');
        if (!contentNode || !data) return;
        contentNode.textContent = data.about || '';
    }

    function fillRoles(data) {
        if (!data || !data.roles) return;
        var listNode = document.getElementById('rolesList');
        if (!listNode) return;
        listNode.innerHTML = '';
        data.roles.forEach(function (roleData) {
            listNode.appendChild(createRoleCard(roleData));
        });
    }

    function fillModules(data) {
        if (!data || !data.modules) return;
        var listNode = document.getElementById('modulesList');
        if (!listNode) return;
        listNode.innerHTML = '';
        data.modules.forEach(function (moduleData) {
            listNode.appendChild(createModuleCard(moduleData));
        });
    }

    function fillHierarchy(data) {
        if (!data || !data.hierarchy) return;
        var descriptionNode = document.getElementById('hierarchyDescription');
        var treeNode = document.getElementById('hierarchyTree');
        if (descriptionNode) descriptionNode.textContent = data.hierarchy.description;
        if (!treeNode || !data.hierarchy.levels) return;

        var treeHtml = '';
        data.hierarchy.levels.forEach(function (levelName, levelIndex) {
            var indentRem = levelIndex * 1.5;
            var isFirst = levelIndex === 0;
            var dotColor = levelIndex === 0 ? 'bg-brand' : (levelIndex < 3 ? 'bg-indigo-400' : 'bg-slate-300');

            treeHtml +=
                '<div class="flex items-center gap-3 py-2" style="padding-left: ' + indentRem + 'rem">' +
                (isFirst ? '' : '<div class="w-6 h-px bg-slate-300"></div>') +
                '<div class="w-3 h-3 rounded-full ' + dotColor + ' flex-shrink-0"></div>' +
                '<span class="text-sm font-medium text-slate-700">' + levelName + '</span>' +
                '</div>';
        });
        treeNode.innerHTML = treeHtml;
    }

    function fillAccess(data) {
        if (!data || !data.access) return;
        var cardsNode = document.getElementById('accessCards');
        var helpNode = document.getElementById('accessHelp');

        if (cardsNode) {
            var portalEntries = [data.access.admin, data.access.candidate];
            cardsNode.innerHTML = '';
            portalEntries.forEach(function (portal) {
                if (!portal) return;
                var card = document.createElement('div');
                card.className = 'bg-white/10 backdrop-blur rounded-xl p-6 border border-white/10';
                card.innerHTML =
                    '<h3 class="text-lg font-bold text-white mb-2">' + portal.label + '</h3>' +
                    '<p class="text-slate-300 text-sm mb-4">' + portal.description + '</p>' +
                    '<code class="text-xs bg-white/10 text-slate-200 px-3 py-1.5 rounded font-mono">' + portal.url + '</code>';
                cardsNode.appendChild(card);
            });
        }

        if (helpNode) helpNode.textContent = data.access.help || '';
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
        fillRoles(data);
        fillModules(data);
        fillHierarchy(data);
        fillAccess(data);
        fillFooter();
    }

    global.sharedContentBinder = {
        init: init
    };

})(window);
