// assessmentDataLayer: simple markdown renderer for assessment-management.md
(function (global) {
    const assessmentDataLayer = {
        init: function () {
            return new Promise((resolve) => {
                const pathCandidates = ['../../docs/assessment-management.md', '/docs/assessment-management.md'];
                fetchSequential(pathCandidates, (md) => {
                    if (!md) { fillFallback(); resolve(); return; }
                    renderMarkdown(md);
                    resolve();
                });
            });
        }
    };

    function fetchSequential(paths, cb) {
        let i = 0;
        function next() {
            if (i >= paths.length) return cb(null);
            fetch(paths[i]).then(r => { if (!r.ok) throw new Error('bad'); return r.text(); }).then(t => cb(t)).catch(() => { i++; next(); });
        }
        next();
    }

    function renderMarkdown(md) {
        const lines = md.split(/\r?\n/);
        // Title: first H1 or H2
        const titleLine = lines.find(l => /^#/.test(l));
        if (titleLine) setText('heroTitle', titleLine.replace(/^#+\s*/, ''));

        // Build simple HTML: convert '## ' to h2 and numbered lists to ol
        let html = '';
        let inOl = false;
        lines.forEach((raw) => {
            const l = raw.trim();
            if (!l) {
                if (inOl) { html += '</ol>'; inOl = false; }
                return;
            }
            if (/^##\s+/.test(l)) { if (inOl) { html += '</ol>'; inOl = false; } html += `<h2>${escapeHtml(l.replace(/^##\s+/, ''))}</h2>`; return; }
            if (/^\d+\.\s+/.test(l)) {
                if (!inOl) { html += '<ol>'; inOl = true; }
                html += `<li>${escapeHtml(l.replace(/^\d+\.\s+/, ''))}</li>`;
                return;
            }
            html += `<p>${escapeHtml(l)}</p>`;
        });
        if (inOl) html += '</ol>';

        const container = document.getElementById('docsContent'); if (container) container.innerHTML = html;

        // Anchor ids to match headings used in the docs for the aside nav
        const randomHeading = document.querySelector('h2'); if (randomHeading && randomHeading.textContent.toLowerCase().includes('random')) randomHeading.id = 'randomization';
        const uploadHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.toLowerCase().includes('upload'));
        if (uploadHeading) uploadHeading.id = 'upload-images';
    }

    function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    function setText(id, text) { const el = document.getElementById(id); if (!el) return; el.textContent = text; }

    function fillFallback() { setText('heroTitle', 'Assessment Management'); const container = document.getElementById('docsContent'); if (container) container.innerHTML = '<p>Documentation unavailable.</p>'; }

    global.assessmentDataLayer = assessmentDataLayer;
})(window);
