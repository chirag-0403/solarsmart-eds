# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--solarsmart-eds--chirag-0403.aem.page/
- Live: https://main--solarsmart-eds--chirag-0403.aem.live/

## Documentation

Before using the aem-boilerplate, we recommend you to go through the documentation on https://www.aem.live/docs/ and more specifically:
1. [Developer Tutorial](https://www.aem.live/developer/tutorial)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `solarsmart-eds` directory in your favorite IDE and start coding :)

# Block Party Integration – SolarSmart

## 1. FAQ (Accordion) Block

- **Source:** Adobe EDS Block Party.
- **Original block:** Accordion.
- **Copied files:**
  - `blocks/faq/faq.js`
  - `blocks/faq/faq.css`
- **Purpose:** Displays expandable questions and answers.
- **Modifications:** Added SolarSmart FAQ content and customized styling to match the website's theme.
- **Dependencies:** Native HTML `<details>` and `<summary>` elements.

## 2. Tabs Block

- **Source:** Adobe EDS Block Party.
- **Original block:** Tabs.
- **Copied files:**
  - `blocks/tabs/tabs.js`
  - `blocks/tabs/tabs.css`
- **Purpose:** Displays content in selectable tabs.
- **Modifications:** Added SolarSmart content for Residential Solar, Solar Battery Storage, and Smart Energy Monitoring.

## 3. Validation

- JavaScript ESLint checks passed.
- CSS Stylelint checks passed.
- Both blocks pushed to GitHub.
- Both blocks tested on the published SolarSmart website.