# Apostolos Provatidis

Personal portfolio for **https://provatidis.github.io/**.

A responsive, dependency-free website featuring Passiko and Inflow, with LinkedIn, X, and GitHub contact links. Includes light and dark themes, keyboard navigation, and reduced-motion support.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765.

## Publish with GitHub Pages

1. Create a public repository named **provatidis.github.io** under the **provatidis** GitHub account.
2. Commit this site's files to its `main` branch.
3. In **Settings → Pages → Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select **main** and **/ (root)**, then save.
5. GitHub publishes the site at **https://provatidis.github.io/**. The first deployment may take up to 10 minutes.

No build or package installation is needed. `.nojekyll` keeps GitHub Pages from processing the site with Jekyll.

See the [official GitHub Pages guide](https://docs.github.com/en/pages/quickstart).

## Update the page

- `index.html`: biography, project descriptions, and social links.
- `styles.css`: layout, colors, typography, and responsive styles.
- `script.js`: theme preference and copyright year.
- `assets/favicon.svg`: site icon.

All page assets are local. The page uses system fonts, with no analytics, cookies, third-party scripts, or external runtime requests. External links open in a new tab. Only the theme preference is saved in the visitor's browser.

The project illustrations are decorative representations, not screenshots or live financial results. Project descriptions are based on the projects' public READMEs. Social handles were supplied by Apostolos.
