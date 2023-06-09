/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "./types/.eslintrc-auto-import.json",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:tailwindcss/recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["simple-import-sort", "import"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-unresolved": [
      "error",
      {
        ignore: [
          "^@/",
          "appconfig",
          "virtual:generated-layouts",
          "virtual:generated-pages",
          "~pages",
          "vue-router/auto/routes",
        ],
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "tailwindcss/no-custom-classname": "off",
    semi: ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
      },
    ],
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
  },
};
