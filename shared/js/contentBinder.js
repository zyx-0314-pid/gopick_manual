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
        data.hierarchy.levels.forEach(function (levelItem, levelIndex) {
            var levelName = typeof levelItem === 'string' ? levelItem : levelItem.name;
            var levelDepth = typeof levelItem === 'string' ? levelIndex : (levelItem.level || 0);
            var indentRem = levelDepth * 1.5;
            var isFirst = levelDepth === 0;
            var dotColor = levelDepth === 0 ? 'bg-brand' : (levelDepth < 3 ? 'bg-indigo-400' : 'bg-slate-300');

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

    var PLATFORM_ICON_SVG_MAP = {
        github: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.92c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.91v2.81c0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"/></svg>',
        linkedin: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 8.98H3.7v10.36h3.24V8.98ZM5.32 4a1.88 1.88 0 1 0 0 3.76 1.88 1.88 0 0 0 0-3.76Zm13.9 5.37c-.68-.38-1.47-.57-2.37-.57-1.47 0-2.54.63-3.17 1.5V8.98h-3.1v10.36h3.24v-5.13c0-1.35.25-2.66 1.93-2.66 1.65 0 1.67 1.55 1.67 2.74v5.05h3.24v-5.7c0-2.8-.6-3.8-1.44-4.27Z"/></svg>',
        credly: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 5 6v5.4c0 4.18 2.84 8.08 7 9.6 4.16-1.52 7-5.42 7-9.6V6l-7-3Z" fill="currentColor"/><path d="m8.5 12 2.2 2.2 4.8-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };

    function getPlatformIconSvg(label) {
        var key = (label || '').toLowerCase();
        return PLATFORM_ICON_SVG_MAP[key] || '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }

    function fillContributors(data) {
        if (!data || !data.contributors) return;
        var listNode = document.getElementById('contributorsList');
        if (!listNode) return;
        listNode.innerHTML = '';

        data.contributors.forEach(function (contributor) {
            var card = document.createElement('article');
            card.className = 'relative overflow-hidden rounded-lg border-2 border-red-100 bg-white p-3 shadow-lg shadow-slate-200/60';

            var frame = document.createElement('div');
            frame.className = 'rounded-md border border-slate-100 bg-slate-50 p-4';

            var topRow = document.createElement('div');
            topRow.className = 'mb-3 flex items-center justify-between gap-3';

            var period = document.createElement('p');
            period.className = 'inline-flex rounded-md bg-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-white';
            period.textContent = contributor.period || '';

            topRow.appendChild(period);
            frame.appendChild(topRow);

            var avatarPanel = document.createElement('div');
            avatarPanel.className = 'mb-5 flex h-44 items-center justify-center overflow-hidden rounded-md border border-red-100 bg-gradient-to-br from-white via-red-50 to-slate-100';

            var avatar = document.createElement('img');
            avatar.className = 'h-full w-full object-contain p-3';
            avatar.src = contributor.avatarUrl || 'https://api.dicebear.com/9.x/notionists/svg?seed=GoPick';
            avatar.alt = contributor.name ? contributor.name + ' avatar' : 'Contributor avatar';
            avatar.loading = 'lazy';
            avatarPanel.appendChild(avatar);
            frame.appendChild(avatarPanel);

            var name = document.createElement('h3');
            name.className = 'text-2xl font-extrabold text-slate-900';
            name.textContent = contributor.name || '';

            var role = document.createElement('p');
            role.className = 'mt-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-100';
            role.textContent = contributor.role || '';

            frame.appendChild(name);
            frame.appendChild(role);

            if (contributor.links && contributor.links.length) {
                var links = document.createElement('div');
                links.className = 'mt-5 grid gap-3 sm:grid-cols-3';

                contributor.links.forEach(function (item) {
                    var link = document.createElement('a');
                    link.className = 'inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-brand hover:bg-red-50 hover:text-brand';
                    link.href = item.url || '#';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';

                    var icon = document.createElement('span');
                    icon.className = 'inline-flex text-brand';
                    icon.innerHTML = getPlatformIconSvg(item.label);

                    var label = document.createElement('span');
                    label.textContent = item.label || 'Link';

                    link.appendChild(icon);
                    link.appendChild(label);
                    links.appendChild(link);
                });

                frame.appendChild(links);
            }

            card.appendChild(frame);
            listNode.appendChild(card);
        });
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
        fillContributors(data);
        fillFooter();
    }

    global.sharedContentBinder = {
        init: init
    };

})(window);
