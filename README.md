# Vite-Vue

Vite-Vue is a scaffold project for quickly setting up a Vue 3 application with Vite, providing an integrated solution for using Pinia, Vue Router, Tailwind CSS, and other essential libraries.

https://chipper-puffpuff-3135be.netlify.app/

## Features

- Pre-configured with Vite for fast development and optimized builds
- Integrated styling solution using Tailwind CSS and SASS support for extended styling capabilities
- Centralized state management using Pinia
- Client-side navigation with Vue Router
- Type checking with TypeScript throughout development and build processes
- Essential libraries included:
  - Collection of Vue composition utilities with `VueUse`
  - SVG support with `vite-svg-loader`
  - JSX syntax support with `@vitejs/plugin-vue-jsx`
- Testing setup with Playwright and Vitest
- Code quality tools: ESLint, Prettier, Husky, [Lint Staged\*](#note-about-lint-staged), and Commitlint

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
# To watch the tests with the UI
npm run test:unit:watch
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Watch the end-to-end tests with the UI
npm run test:e2e:watch
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format and lint

```sh
npm run lf
```

### Note about lint-staged

To prevent future conflicts with linted files, the `npx lint-staged` command has been removed from the `pre-commit` hook. Instead, the `npm run lf` command is now used to process all files.

`lint-staged` is still in the dependencies list for other operations like testing only the staged files with `vitest related`.

This change was made because sorting class names in files can lead to conflicts, even if no modifications were made to other files by the contributors.
