# Periodic Table Master

Live site: https://Max3141592653.github.io/

An interactive, accessible, and multilingual periodic table of the elements — built as a static web application with no backend required.

## Features

- Complete periodic table with main groups and f-block rows.
- Simple (56) and full (118) element modes.
- Practice mode: click empty cells and guess by symbol or name.
- Knowledge quiz in three modes: symbol → name, name → symbol, and number → name.
- Multilingual interface and element names: English, Catalan, and Spanish.
- Reveal colours by element category (metals, non-metals, metalloids, noble gases).
- Progress tracking, timer, mistakes log, and best time.
- Dark and light themes.
- Accessible markup with keyboard support and ARIA labels.
- Local-first: all progress stays in the browser.

## Getting started

### Run locally

```bash
npm start
```

Then open <http://localhost:3000>.

Alternatively, serve the folder with any static server:

```bash
python -m http.server 8080
```

### Deploy

GitHub Pages is configured via `.github/workflows/deploy.yml`. Push to `main` and enable Pages (source: GitHub Actions) in the repository settings.

## Project structure

```text
.
├── assets/
│   ├── css/main.css
│   └── js/
│       ├── app.js
│       ├── elements.js
│       └── i18n.js
├── index.html
├── PRIVACY.md
├── TERMS.md
├── SECURITY.md
├── CONTRIBUTING.md
└── LICENSE
```

## Privacy

No user data leaves the browser. See [PRIVACY.md](PRIVACY.md).

## License

Released under the [MIT License](LICENSE).
