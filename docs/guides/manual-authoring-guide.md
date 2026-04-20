# Manual Authoring Guide

Use this guide when creating or updating GoPick manual pages in Markdown and when turning those pages into HTML/CSS/JS manual pages.

The manual is the shared source of truth for IT Developers, QA, and non-technical users. Every update should preserve three things:

- Content truth: steps, rules, expected results, and explanations are accurate.
- UI uniformity: manual pages look and behave the same way.
- Code uniformity: each rendered page follows the same file structure and rendering approach.

Related guides:

- `docs/guides/manual-documentation-standard.md` for the full documentation standard.
- `docs/guides/manual-nontech-template.md` for a simplified non-technical copy template.

## Where To Put Files

Source Markdown belongs in `docs/`.

```text
docs/candidate-management.md
docs/meters-management.md
docs/reports-management.md
```

Rendered manual pages belong in `pages/<module-name>/`.

```text
pages/candidate-management/index.html
pages/candidate-management/assets/css/style.css
pages/candidate-management/assets/css/layout.css
pages/candidate-management/assets/js/dataFiller.js
pages/candidate-management/assets/js/behavior.js
```

Guide documents belong in `docs/guides/`.

```text
docs/guides/manual-authoring-guide.md
docs/guides/manual-documentation-standard.md
docs/guides/manual-nontech-template.md
```

## Naming Rules

Use lowercase kebab-case for files and folders.

Good:

```text
reports-management.md
pages/reports-management/
roles-permission-management.md
```

Avoid:

```text
ReportsManagement.md
reports_management.md
roles-premission-management.md
```

Use the same module slug in both places:

```text
docs/reports-management.md
pages/reports-management/index.html
```

## Markdown Page Pattern

Use Candidate Management as the baseline. Start with this structure for module pages:

```md
# Module Name

> Legends:
> (Admin) - Super Admin IT or Super Admin ASD
> (Accounts) - Distributor, Sub Distributor, Client, Sub-Client

## Main Feature
Plain description of what this feature does.

### Workflow Or Subfeature
Plain description of when this workflow is used.

1. Open `Menu` > `Page`.
2. Select the record or option.
3. Click `Action`.

> Rules:
> - System rule or validation.
> - Permission rule or display behavior.

> Expected Result:
> - What appears on screen.
> - What data, report, status, email, or log changes.

> Notes:
> - Extra explanation, terminology, or caveat.
```

## Writing Principles

Write for IT Developers, QA, and non-technical users at the same time.

- Steps tell the user what to do.
- Rules tell what the system enforces.
- Expected Result tells QA and users what should happen.
- Notes explain why or clarify terms.
- Technical Reference connects UI behavior to modules/actions when useful.

Keep each kind of information in its proper block. Do not hide rules inside a step, and do not put expected outcomes only in a description.

## Steps

Use numbered lists for workflows.

```md
1. Open `Report` > `Search Usage`.
2. Select assessments.
3. In `Bulk Action`, select `Download Report`.
```

Rules for steps:

- Use exact UI labels inside backticks.
- Keep one action per step when possible.
- Start with action words like `Open`, `Select`, `Enter`, `Click`, `Review`, `Save`.
- Use nested bullets only for role-specific or option-specific choices.
- Do not use vague wording like `etc.` when QA needs to verify the behavior.

## Rules

Rules are system truth. They are mainly for QA and IT Developers, but should still be readable by non-technical users.

Use this format:

```md
> Rules:
> - Account Type can only be lower than your account type.
> - Password and Confirm Password should match.
```

Rules should include:

- Required fields.
- Disabled, locked, hidden, or unavailable states.
- Permission and RBAC conditions.
- Display logic.
- Validation behavior.
- Data movement, deduction, transfer, or log behavior.
- Report availability behavior.

Rules are callouts, not normal sections. They should not become sidebar items unless the feature itself is a rule table or matrix.

## Expected Result

Use Expected Result when an action creates a visible outcome.

```md
> Expected Result:
> - The selected report downloads to the user's computer.
> - Candidates without generated reports remain unavailable for download.
```

Expected results should mention:

- Screen changes.
- Table updates.
- Created records.
- Downloaded files.
- Sent emails.
- Status changes.
- Meter balance changes.
- Log entries.

## Notes

Use Notes for helpful context that is not enforced behavior.

```md
> Notes:
> - Test Battery means a group of assessments bundled together.
```

Do not put required behavior in Notes. If QA must verify it, it belongs in Rules or Expected Result.

## Technical Reference

Use Technical Reference for IT-only identifiers.

```md
> Technical Reference:
> - Module: `modUsage`
> - Related action: `modArchiveReport-actionDownload`
```

Rules:

- Do not use module names as user-facing labels unless the UI displays them.
- Keep technical references after the user-facing explanation.
- Use technical references to help developers find the related code or RBAC action.

## UI Uniformity Rules

Rendered manual pages should match the existing manual design.

Each page should have:

- Fixed header with GoPick logo.
- Home link and active current page label.
- Top page title and short description.
- Desktop left aside with `On this page` navigation.
- Mobile aside drawer using `shared/js/manualNav.js`.
- Main content in the same white rounded content surface.
- Footer with current year.

Sidebar behavior:

- `##` becomes a top-level sidebar item.
- `###` and deeper headings become nested items when the page supports hierarchy.
- Rules, Expected Result, Notes, and Technical Reference blocks do not appear in the sidebar.
- Active sidebar branch expands while scrolling or after clicking a hash link.

Content block behavior:

- Steps should render as numbered step cards or consistent ordered sections.
- Rules should render as the yellow/amber callout titled `Rules`.
- Expected Result should render as a distinct callout titled `Expected Result`.
- Notes should render as a lighter informational block or plain note block.

## Code Uniformity Rules

When creating a new rendered page, follow the existing page shape.

Required files:

```text
pages/<module>/index.html
pages/<module>/assets/css/style.css
pages/<module>/assets/css/layout.css
pages/<module>/assets/js/dataFiller.js
pages/<module>/assets/js/behavior.js
```

`index.html` should:

- Use the same header, footer, grid, aside, and content shell as Candidate/Meters pages.
- Include `assets/css/style.css` and `assets/css/layout.css`.
- Include `assets/js/dataFiller.js`, `assets/js/behavior.js`, and `../../shared/js/manualNav.js`.
- Use `id="docSidebarList"` for sidebar links.
- Use `id="section-render-root"` for rendered content.

`dataFiller.js` should:

- Store page content in a single content object.
- Render headings, descriptions, steps, rules, expected results, and notes from structured data.
- Build sidebar items from the same content object.
- Use existing helper patterns from Candidate Management or Meters Management.
- Avoid page-specific UI inventions unless the module truly needs them.

`behavior.js` should:

- Keep page-level behavior minimal.
- Set the footer year.
- Avoid duplicating shared navigation behavior.

CSS should:

- Stay minimal and page-specific.
- Reuse Tailwind classes and existing layout patterns before adding custom styles.
- Avoid changing shared UI behavior from inside one page.

## Layout Examples

Use these examples when creating a new manual page. They are intentionally close to the existing HTML, CSS, and JS layout so every manual page keeps the same structure.

### HTML Page Layout

Use this as the base for `pages/<module>/index.html`.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Module Name - GoPick</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="icon" type="image/x-icon" href="../../favicon.ico">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { DEFAULT: '#e50914', light: '#ff2d38', dark: '#b3060f' }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 text-slate-800 antialiased">

  <header class="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100" role="banner">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="../../index.html" class="inline-flex items-center" aria-label="GoPick home">
        <img src="../../shared/img/gopick-logo.svg" alt="GoPick Solutions" class="h-10 w-auto">
      </a>
      <nav aria-label="Main navigation">
        <ul class="flex items-center gap-6 text-sm font-medium text-slate-600">
          <li><a class="hover:text-brand transition-colors" href="../../index.html">Home</a></li>
          <li><a class="text-brand font-semibold" href="#" aria-current="page">Module Label</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="pt-20 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-10">
        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900">Module Name</h1>
        <p class="mt-3 text-lg text-slate-500 max-w-3xl">Short page purpose.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside class="hidden lg:block lg:col-span-1">
          <nav id="docSidebar" class="sticky top-24 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">On this page</h4>
            <ul id="docSidebarList" class="space-y-2 text-sm"></ul>
          </nav>
        </aside>

        <div class="lg:col-span-4 space-y-8">
          <section id="docsContent" class="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
            <div id="section-render-root"></div>
          </section>
        </div>
      </div>
    </div>
  </main>

  <footer class="bg-slate-900 py-6">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <p class="text-slate-400 text-sm">&copy; <span id="footerYearSpan"></span> GoPick - Assessment Center</p>
    </div>
  </footer>

  <script src="assets/js/dataFiller.js" defer></script>
  <script src="assets/js/behavior.js" defer></script>
  <script src="../../shared/js/manualNav.js" defer></script>
</body>
</html>
```

HTML rules:

- Keep `docSidebarList` and `section-render-root`; shared and page JS depend on these IDs.
- Keep `manualNav.js`; this provides the mobile aside drawer.
- Only change the page title, active nav label, heading, and description.
- Do not add a different page shell unless the module has a real layout need.

### CSS Layout Files

Use this for `assets/css/style.css` when the page has no special styling.

```css
/* Minimal base styles for Module Name page */
:root {
    --brand: #e50914;
}
```

Use this for `assets/css/layout.css`.

```css
html {
    scroll-behavior: smooth;
}

[tabindex="-1"]:focus {
    outline: none;
}
```

CSS rules:

- Prefer Tailwind utility classes already used in existing pages.
- Add custom CSS only for page-specific behavior that cannot be expressed clearly in the existing pattern.
- Do not redefine header, sidebar, footer, or shared navigation styles inside one module page.

### Behavior JS Layout

Use this for `assets/js/behavior.js`.

```js
(function () {
    'use strict';

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initPage() {
        setFooterYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }
})();
```

Behavior rules:

- Keep this file small.
- Use it for page-only behavior such as footer year or page-specific interaction.
- Do not duplicate sidebar drawer behavior; that belongs to `shared/js/manualNav.js`.

### Data Renderer JS Layout

Use this structure for `assets/js/dataFiller.js`. The content object should match the Markdown source.

```js
// module data filler - content derived from docs/module-name.md
(function (global) {
    'use strict';

    const moduleContent = {
        title: 'Module Name',
        sections: [
            {
                id: 'main-feature',
                title: 'Main Feature',
                description: 'Plain explanation of what this feature does.',
                rules: [
                    'System rule or validation behavior.',
                    'Permission, display, lock, or availability rule.'
                ],
                expectedResults: [
                    'What appears after completing the steps.',
                    'What data, status, file, email, or log changes.'
                ],
                steps: [
                    'Open Menu, then Page.',
                    'Select the record or option.',
                    'Click Save.'
                ],
                children: [
                    {
                        id: 'sub-feature',
                        title: 'Sub Feature',
                        description: 'Plain explanation of the sub-feature.',
                        steps: [
                            'Open the related page.',
                            'Select the action.'
                        ]
                    }
                ]
            }
        ]
    };

    function createBulletList(items) {
        const list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'flex gap-2';

            const marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

            const text = document.createElement('span');
            text.textContent = item;

            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);
        });
        return list;
    }

    function createStepCard(index, text) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = text;

        wrap.appendChild(badge);
        wrap.appendChild(detail);
        return wrap;
    }

    function createCallout(title, items, tone) {
        const wrap = document.createElement('div');
        const isRule = tone === 'rules';
        wrap.className = isRule
            ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
            : 'mt-5 rounded-lg border border-slate-100 bg-slate-50 p-5';

        const heading = document.createElement('h3');
        heading.className = isRule ? 'font-semibold text-amber-900 mb-3' : 'font-semibold text-slate-900 mb-3';
        heading.textContent = title;

        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
        return wrap;
    }

    function renderSectionBody(section, target) {
        if (section.steps && section.steps.length) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            target.appendChild(createCallout('Rules', section.rules, 'rules'));
        }

        if (section.expectedResults && section.expectedResults.length) {
            target.appendChild(createCallout('Expected Result', section.expectedResults, 'expected'));
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        if (eyebrowText) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = eyebrowText;
            fragment.appendChild(eyebrow);
        }

        const heading = document.createElement(headingLevel === 2 ? 'h2' : 'h3');
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : 'text-lg font-bold text-slate-900';
        heading.textContent = section.title;
        heading.setAttribute('tabindex', '-1');
        fragment.appendChild(heading);

        if (section.description) {
            const desc = document.createElement('p');
            desc.className = 'text-sm text-slate-500 mt-2 mb-5';
            desc.textContent = section.description;
            fragment.appendChild(desc);
        }

        return fragment;
    }

    function renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
        const sectionEl = document.createElement('section');
        sectionEl.className = isTopLevel ? 'mb-10' : 'mt-8 border-t border-slate-100 pt-6';
        sectionEl.appendChild(renderSectionHeader(section, headingLevel, eyebrowText));
        renderSectionBody(section, sectionEl);

        if (section.children && section.children.length) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 3), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        moduleContent.sections.forEach(function (section) {
            root.appendChild(renderSectionTree(section, 2, null, true));
        });
    }

    function createSidebarItem(section, level) {
        const li = document.createElement('li');
        li.className = 'sidebar-item';

        const link = document.createElement('a');
        link.className = level === 0
            ? 'block text-slate-600 hover:text-brand transition-colors py-1 text-sm'
            : 'block text-slate-600 hover:text-brand transition-colors py-1 text-[13px] pl-3 border-l border-slate-100';
        link.href = '#' + section.id;
        link.dataset.target = section.id;
        link.textContent = section.title;
        li.appendChild(link);

        if (section.children && section.children.length) {
            const childList = document.createElement('ul');
            childList.className = 'sidebar-children hidden mt-1 space-y-1';
            section.children.forEach(function (child) {
                childList.appendChild(createSidebarItem(child, level + 1));
            });
            li.appendChild(childList);
        }

        return li;
    }

    function renderSidebar() {
        const list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        moduleContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function renderAll() {
        renderSidebar();
        renderAllSections();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__moduleContent = moduleContent;
})(window);
```

Renderer rules:

- Keep the Markdown source and `moduleContent` object aligned.
- Use `rules` for system behavior and render it as a yellow callout.
- Use `expectedResults` for what QA/non-technical users should see after actions.
- Do not add `rules`, `expectedResults`, `notes`, or `technicalReference` as sidebar items.
- Reuse this renderer shape unless the page needs tables, matrices, or other special UI.

### Example Content Mapping

Markdown source:

```md
## Search Usage
Search and review assessment usage records.

> Rules:
> - Group Assessment/Test Battery shows the Test Battery name above the sub-assessment name.
> - Single Assessment shows only the assessment name.

### Exporting Reports
Download available assessment reports.

1. Select `Report` > `Search Usage`.
2. Select assessments.
3. In `Bulk Action`, select `Download Report`.
```

Matching JS content object:

```js
{
    id: 'search-usage',
    title: 'Search Usage',
    description: 'Search and review assessment usage records.',
    rules: [
        'Group Assessment/Test Battery shows the Test Battery name above the sub-assessment name.',
        'Single Assessment shows only the assessment name.'
    ],
    children: [
        {
            id: 'exporting-reports',
            title: 'Exporting Reports',
            description: 'Download available assessment reports.',
            steps: [
                'Select Report, then Search Usage.',
                'Select assessments.',
                'In Bulk Action, select Download Report.'
            ]
        }
    ]
}
```

## Updating Existing Manual Pages

When updating a manual page:

1. Update the Markdown source in `docs/` first.
2. Preserve existing wording if it is already accepted business/system truth.
3. Keep Rules, Expected Result, Notes, and Technical Reference separate.
4. Update the rendered page content object in `pages/<module>/assets/js/dataFiller.js`.
5. Confirm the sidebar hierarchy still matches the page hierarchy.
6. Confirm callout blocks are not added to the sidebar.
7. Review by reading the Markdown and rendered content data side by side.

## Adding A New Manual Page

When adding a new page:

1. Create `docs/<module>.md`.
2. Write the page using the Candidate Management baseline.
3. Create `pages/<module>/index.html` using an existing simple page as the base.
4. Create `assets/css/style.css`, `assets/css/layout.css`, `assets/js/dataFiller.js`, and `assets/js/behavior.js`.
5. Add the page to shared navigation or feature data if it should appear on the home page.
6. Verify the page uses the same aside behavior and content hierarchy as existing pages.

## Review Checklist

Before considering a page done, check:

- Markdown uses the correct heading hierarchy.
- Steps are clear and ordered.
- Rules are in `> Rules:` callouts.
- Expected outcomes are documented for actions that save, send, approve, reject, download, transfer, or update.
- Technical terms are explained or moved to Technical Reference.
- Non-technical readers can understand what to do and what should happen.
- The rendered page uses the same shell and sidebar behavior as existing pages.
- The content object and Markdown source describe the same truth.
- No new UI pattern was introduced without a reason.
- No shared behavior was duplicated inside one page.

