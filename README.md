# PhyloCov

PhyloCov is a lightweight public-facing web shell for one or more Google Earth Engine applications focused on climate and ecological covariates for phylodynamic analysis and transmission modelling.

## Recommended architecture

Keep the Earth Engine app and the website separate.

- The Earth Engine app remains its own published application.
- This repository hosts the landing page, project context, navigation, and iframe embed.
- You can add more Earth Engine apps later by editing one config file instead of redesigning the site.

This separation is the lowest-friction option for maintenance and GitHub hosting.

## Project structure

- `index.html`: homepage and platform overview
- `platform.html`: dedicated live Earth Engine app page
- `datasets.html`: covariate families and representative products
- `methods.html`: extraction workflow and modelling context
- `cite.html`: citation and attribution guidance
- `about.html`: project framing and roadmap
- `styles.css`: shared visual design and responsive styling
- `script.js`: app switcher and iframe loader for the platform page
- `app-config.js`: list of hosted Earth Engine apps

## Connect your Earth Engine app

1. Publish your Earth Engine app.
2. Open `app-config.js`.
3. Replace the empty `url` field with your live app URL.
4. If the app can be displayed inside an iframe, leave `embed: true`.
5. If the app should open separately, set `embed: false`.
6. Duplicate the object in the array when you want to add more tools.

Example:

```js
window.PHYLOCOV_APPS = [
  {
    id: "climate-covariates",
    title: "Climate Covariates Explorer",
    summary: "Browse climate and ecological covariates.",
    description: "Main Earth Engine application for PhyloCov.",
    url: "https://your-earth-engine-app-url",
    embed: true,
    tags: ["Earth Engine", "Climate", "Ecology"]
  }
];
```

If iframe embedding fails for your published Earth Engine app, switch that entry to `embed: false`. The site will keep the same launcher UI but direct users to open the tool in a new tab.

## Run locally

Because this is a static site, you can preview it with any simple local server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish to GitHub

1. Create a new GitHub repository.
2. Initialize Git in this folder if you have not already:

```bash
git init
git add .
git commit -m "Initial PhyloCov site"
```

3. Add your GitHub remote:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

4. In GitHub, open `Settings > Pages`.
5. Set the source to `Deploy from a branch`.
6. Choose the `main` branch and `/ (root)`.

GitHub Pages will then host the site directly from this repository.

## Customization ideas

- Add a datasets page with covariate descriptions and sources
- Add citations and project team information
- Add an updates section or changelog
- Add multiple Earth Engine apps with thematic grouping
