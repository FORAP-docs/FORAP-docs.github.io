# FORAP Documentation Website

**[Visit the FORAP website](https://forap-docs.github.io/)**

FORAP is the **Framework for Organizing Reusable and Adaptable Project-Based Learning (PjBL) Projects**. It helps computing educators organize project objectives, instructor guidance, student support, and assessment materials so that projects can be shared, reused, and adapted across courses.

This repository contains the public documentation website. It explains the framework and presents examples and a project portfolio. Individual project files linked from the website are maintained separately.

## Explore the framework

- [Overview and purpose](https://forap-docs.github.io/purpose.html)
- [Architecture](https://forap-docs.github.io/architecture.html) and [guiding principles](https://forap-docs.github.io/principles.html)
- [Support packages](https://forap-docs.github.io/support.html) and [project attributes](https://forap-docs.github.io/attributes.html)
- [Guidance for applying FORAP](https://forap-docs.github.io/steps.html)
- [Touchalytics illustrative example](https://forap-docs.github.io/example.html)
- [Project portfolio](https://forap-docs.github.io/portfolio.html)

## Preview locally

The website consists of static HTML, CSS, and JavaScript. No application build is required to preview it.

Clone this repository, open its folder, and start a local server with Python 3:

```sh
git clone https://github.com/FORAP-docs/FORAP-docs.github.io.git
cd FORAP-docs.github.io
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, use `py -m http.server 8000 --bind 127.0.0.1`. Open <http://127.0.0.1:8000> in a browser. Stop the server with `Ctrl+C`.

An internet connection is needed for the externally hosted Carbon components and IBM Plex fonts. Some example project materials also open on external services.

## Maintain the website

Page content is in the root HTML files. Shared styles are in `css/styles.css`, navigation and interactions are in `js/main.js`, and media are in `assets/`.

The pages load `css/styles.min.css`. After changing `css/styles.css`, regenerate that file with Node.js and npm installed:

```sh
npx --yes clean-css-cli@5.6.3 -o css/styles.min.css css/styles.css
```

Update the stylesheet version in the affected HTML links when publishing CSS changes. Check navigation, tabs, images, and the mobile layout before submitting a change. GitHub Pages serves the public website from this repository.

## Evaluation analysis software

The separate [FORAP Evaluation Analysis repository](https://github.com/FORAP-docs/forap-evaluation-analysis) provides the local analysis application, installation instructions, synthetic example responses, and a blank input template. It does not include participant responses or the study's coding database.

## Feedback

Use [GitHub Issues](https://github.com/FORAP-docs/FORAP-docs.github.io/issues) to report documentation errors or suggest improvements. Include the relevant page and a brief description. Research contacts are listed in the website footer.

## Licensing

- **Original website code:** [MIT License](LICENSE). This covers the original HTML structure, CSS, and JavaScript, excluding the content and third-party materials described below.
- **Original written documentation:** [CC BY 4.0](LICENSE-CONTENT.md). This covers the original explanatory text in the documentation pages and this README. Reuse requires attribution, a license link, and an indication of changes.
- **Media and third-party materials:** Images, diagrams, video, audio, animations, captions, logos, and SVG artwork (including inline icons) are excluded from these new grants. External components, fonts, and linked project files retain their own terms. See [third-party and media notices](THIRD-PARTY-NOTICES.md).

For documentation attribution, identify FORAP contributors, link to the [FORAP website](https://forap-docs.github.io/) and [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), and describe any changes. These licenses do not grant trademark rights or imply endorsement by FORAP or the projects in its portfolio.
