// accountsDataLayer: structured converter for account-management.md
(function (global) {
    const accountsDataLayer = {
        init: function () {
            return new Promise((resolve) => {
                const pathCandidates = ['../../docs/account-management.md', '/docs/account-management.md'];
                fetchSequential(pathCandidates, (md) => {
                    if (!md) {
                        fillFallback();
                        resolve();
                        return;
                    }
                    const doc = parseAccountManagementMd(md);
                    renderDocument(doc);
                    resolve();
                });
            });
        }
    };

    // Try fetching from candidate paths in order
    function fetchSequential(paths, cb) {
        let i = 0;
        function next() {
            if (i >= paths.length) return cb(null);
            fetch(paths[i]).then(r => { if (!r.ok) throw new Error('bad'); return r.text(); }).then(t => cb(t)).catch(() => { i++; next(); });
        }
        next();
    }

    // Parse the specific markdown into structured object
    function parseAccountManagementMd(md) {
        const lines = md.split(/\r?\n/);
        const doc = { title: '', tables: [], legends: [], hierarchy: '' };

        // Capture first H1 as title
        for (let i = 0; i < lines.length; i++) {
            const l = lines[i].trim();
            if (l.startsWith('# ')) { doc.title = l.replace(/^#\s+/, '').trim(); break; }
        }

        // Find first contiguous table block (lines that contain | and --- separator)
        let inTable = false; let tableLines = [];
        for (let i = 0; i < lines.length; i++) {
            const l = lines[i];
            if (/^\|/.test(l) && /\|/.test(l)) {
                inTable = true; tableLines.push(l);
                continue;
            }
            if (inTable) break;
        }
        if (tableLines.length) doc.tables.push(parseMarkdownTable(tableLines));

        // Extract Legends section
        const legendsIdx = lines.findIndex(r => /^Legends/i.test(r.trim()));
        if (legendsIdx >= 0) {
            // collect following non-empty lines until a blank or '---'
            let j = legendsIdx + 1;
            while (j < lines.length) {
                const l = lines[j].trim();
                if (!l || /^---/.test(l)) break;
                if (/^-/.test(l) || /^[A-Za-z].*:/.test(l) || /^[A-Z] - /.test(l)) {
                    doc.legends.push(l);
                } else if (/^[A-Z] - /.test(l)) {
                    doc.legends.push(l);
                } else {
                    // also accept lines with 'X -' or 'C -'
                    if (/^[XCN\-\s]/.test(l)) doc.legends.push(l);
                }
                j++;
            }
        }

        // Extract Hierarchy block: code fence or a paragraph that starts with 'Hierarchy:'
        const hierIdx = lines.findIndex(r => /^```/.test(r) || /^Hierarchy:/i.test(r));
        if (hierIdx >= 0) {
            // If it's a code fence, grab until closing fence
            if (/^```/.test(lines[hierIdx])) {
                let j = hierIdx + 1; let h = [];
                while (j < lines.length && !/^```/.test(lines[j])) { h.push(lines[j]); j++; }
                doc.hierarchy = h.join('\n').trim();
            } else {
                // find the paragraph starting with 'Hierarchy:' and grab subsequent indented lines
                let h = lines.slice(hierIdx).join('\n');
                // take up to 200 chars for summary
                doc.hierarchy = h.split('\n').slice(0, 20).join('\n').trim();
            }
        } else {
            // fallback: look for the block that looks like the tree (lines with └─ or ├─)
            const treeLines = lines.filter(l => /[└└─├]/.test(l));
            if (treeLines.length) doc.hierarchy = treeLines.join('\n');
        }

        return doc;
    }

    function parseMarkdownTable(lines) {
        // Normalize and split rows by |, ignoring leading/trailing |
        const rows = lines.map(r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
        // Remove separator row if present (---)
        if (rows.length >= 2 && rows[1].every(c => /^-+$/i.test(c) || c === '')) rows.splice(1, 1);
        return { header: rows[0], rows: rows.slice(1) };
    }

    // Render structured doc into the page
    function renderDocument(doc) {
        if (doc.title) setText('heroTitle', doc.title);
        setText('heroCta', 'View matrix');
        if (doc.tables && doc.tables.length) {
            const container = document.getElementById('docsContent');
            container.innerHTML = '';
            doc.tables.forEach(t => {
                const tbl = buildTableElement(t);
                container.appendChild(tbl);
            });
        }
        if (doc.legends && doc.legends.length) {
            const container = document.getElementById('extrasContent');
            const h = document.createElement('h3'); h.textContent = 'Legends'; container.appendChild(h);
            const ul = document.createElement('ul');
            doc.legends.forEach(item => {
                const li = document.createElement('li'); li.textContent = item; ul.appendChild(li);
            });
            container.appendChild(ul);
        }
        if (doc.hierarchy) {
            const container = document.getElementById('extrasContent');
            const h = document.createElement('h3'); h.textContent = 'Hierarchy'; container.appendChild(h);
            const pre = document.createElement('pre'); pre.textContent = doc.hierarchy; container.appendChild(pre);
        }
    }

    function buildTableElement(tbl) {
        const table = document.createElement('table');
        table.className = 'rbac-table';
        const thead = document.createElement('thead');
        const trh = document.createElement('tr');
        tbl.header.forEach(h => { const th = document.createElement('th'); th.textContent = h; trh.appendChild(th); });
        thead.appendChild(trh);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        tbl.rows.forEach(r => {
            const tr = document.createElement('tr');
            r.forEach(c => { const td = document.createElement('td'); td.textContent = c; tr.appendChild(td); });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        return table;
    }

    function setText(id, text) {
        const el = document.getElementById(id); if (!el) return; el.textContent = text;
    }

    function fillFallback() {
        setText('heroTitle', 'Accounts Management');
        setText('heroSubtitle', 'Role & account controls');
        const container = document.getElementById('docsContent'); if (container) container.innerHTML = '<p>Account documentation unavailable.</p>';
    }

    // Expose global
    global.accountsDataLayer = accountsDataLayer;
})(window);
