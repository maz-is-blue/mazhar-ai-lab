# Portfolio Site (Next.js + Tailwind)

Modern AI engineer portfolio built with Next.js (App Router) and Tailwind CSS. Configured for static export and GitHub Pages deployment.

## Requirements
- Node.js 18+

## Install
```bash
cd portfolio-site
npm install
```

## Develop
```bash
npm run dev
```

## Static Export
```bash
npm run export
```
The static output is generated in `out/`.

## GitHub Pages Deployment
If deploying to a project page (e.g., `https://username.github.io/repo-name`), set the base path:

```bash
$env:NEXT_PUBLIC_BASE_PATH = "/repo-name"
npm run export
```

For a user/organization page (root domain), do not set the base path.

## Notes
- Update links and contact details in `app/contact/page.js`.
- Replace placeholder diagrams in `public/diagrams/` with real architecture diagrams.
- Replace `Download PDF` link in `app/resume/page.js` with your resume URL.
