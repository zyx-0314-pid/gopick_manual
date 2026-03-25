---
name: coding-principles
description: "File-scoped instructions for code and documentation edits under pages, assets, index.html, and docs. Enforces human-first coding principles and AI 'don't do again' rules."
applyTo: "index.html", "pages/**", "assets/**", "docs/**"
version: 1
---

# Coding Principles (Scoped)

Use these rules when editing files that match the `applyTo` patterns above.

- **Human Priority:** Human intent and decisions take precedence over AI suggestions. Follow: Plan > Execute > Feedback > Revise.
- **Spacing:** Use clear spacing between functions, classes, and logical sections.
- **Naming:** Use explicit, multi-word names that clearly convey purpose; avoid generic or single-letter names.
- **Single Responsibility:** Keep functions focused; one responsibility per function.
- **File Separation:** No inline JS/CSS. Keep JS, CSS, and HTML separated; prefer multiple focused files and one aggregator (`script.js`/`style.css`).
- **Shared Assets:** Place reusable code in `assets/js/` and `assets/css/` at repo root.
- **Abstraction:** Keep JS at one level of abstraction per function/module.
- **CSS:** Prefer nested or well-sectioned CSS and modular styles.
- **Accessors:** Use explicit getters/setters where appropriate in JS.
- **Comments:** Use `TODO` only; separate HTML sections/components with clear markers.

## Don't Do Again (AI must always follow)

- Do not change code in ways that override explicit human intent or instructions.
- Do not add inline `<script>` or `<style>` tags to HTML files.
- Do not use single-letter or ambiguous names.
- Do not combine multiple responsibilities in one function or mix abstraction levels.
- Do not add comments other than `TODO` and explicit HTML section markers.
- Do not commit workspace-level changes affecting architecture, naming, or behavior without explicit user approval.
- Do not introduce implicit global state or hidden side-effects in JS.
- Do not remove or bypass verification steps without discussion.
