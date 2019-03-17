# election-live

Live Scoreboard for Thailand General Election 2562 (2019).

## Development

This web application is built using [Gatsby](https://www.gatsbyjs.org). We chose to use Gatsby because:

- It sets up the required tooling, such as webpack, Babel, routing (etc.) for us.
- We can add new pages by adding a file in `src/pages`. No need to fiddle with router.
- It has a comprehensive [documentation](https://www.gatsbyjs.org/docs/), including a lot of [recipes](https://www.gatsbyjs.org/docs/recipes/).
- A lot of things can be done just by installing [Gatsby plugins](https://www.gatsbyjs.org/plugins/), such as adding [Google Fonts](https://www.gatsbyjs.org/packages/gatsby-plugin-web-font-loader/), [Google Analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/).

### `@todo` comments

[![PDD status](http://www.0pdd.com/svg?name=codeforthailand/election-live)](http://www.0pdd.com/p?name=codeforthailand/election-live)

[0pdd](https://github.com/yegor256/0pdd#what-does-it-do) helps us keep track of TODOs by converting `@todo` markers in source code into GitHub issue. The created issue will be closed automatically when the corresponding `@todo` marker is removed from the source code.

### Prerequisites

- Node.js (10.x)
- Yarn

### Install dependencies

```
yarn
```

### Running development server

```
yarn develop
```

### Resources for developers

- &rarr; [Gatsby recipes](https://www.gatsbyjs.org/docs/recipes/)
- &rarr; [Gatsby project structure](https://www.gatsbyjs.org/docs/gatsby-project-structure/)

### How to add new pages

Just add a new file in `src/pages` — each `.js` file becomes a new page automatically.

### Styling

We [use](https://www.gatsbyjs.org/docs/emotion/) [emotion](https://emotion.sh/) to style the website. It allows us to keep the CSS code close to the component that uses it.

- Instead of using inline `style` or CSS file, [use the `css` prop](https://emotion.sh/docs/css-prop) with [object styles](https://emotion.sh/docs/css-prop#object-styles). Example:

  ```js
  function Component() {
    return (
      <div
        css={{
          fontSize: 18,
          "@media (min-width: 600px)": {
            fontSize: 20,
          },
        }}
      />
    )
  }
  ```

  [Object styles](https://emotion.sh/docs/css-prop#object-styles) are preferred over [string styles](https://emotion.sh/docs/css-prop#string-styles) because:

  - VS Code can help autocomplete CSS properties and values.
  - Doesn’t require importing the CSS helper (`import { css } from '@emotion/core'`).
  - Can be automatically formatted using [Prettier](https://prettier.io/).

## Build the project into a static web page

```
yarn build
```
