/// <reference types="vitest" />
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dns from "dns";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig, loadEnv } from "vite";
import Layouts from "vite-plugin-vue-layouts";
import generateSitemap from "vite-ssg-sitemap";
import svgLoader from "vite-svg-loader"; // https://github.com/jpkleemans/vite-svg-loader
import { configDefaults } from "vitest/config";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const DEV_PORT = parseInt(env.VITE_PORT || "5173");

  return {
    plugins: [
      VueRouter({
        dts: "./types/typed-router.d.ts",
      }),
      vue({
        script: {
          defineModel: true,
          propsDestructure: true,
        },
      }),
      vueJsx(), // More examples: https://github.com/vitejs/vite-plugin-vue/tree/main/playground/vue-jsx
      svgLoader({
        svgoConfig: {
          // https://github.com/svg/svgo#built-in-plugins
          plugins: ["preset-default", "removeDimensions"],
        },
      }),
      AutoImport({
        imports: [
          "vue",
          "pinia",
          "@vueuse/head",
          VueRouterAutoImports,
          {
            "vue-router/auto": ["useLink"],
          },
        ],
        dirs: ["src/composables", "src/utils", "src/helpers", "src/stores"],
        dts: "./types/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "./types/.eslintrc-auto-import.json",
        },
      }),
      Components({
        extensions: ["vue", "tsx", "md"],
        dts: "./types/components.d.ts",
        globalNamespaces: ["shared"],
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        deep: true,
        types: [],
      }),
      Layouts(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        appconfig: fileURLToPath(new URL("./appconfig.mjs", import.meta.url)),
      },
    },
    build: {
      commonjsOptions: {
        include: ["appconfig.mjs", "node_modules/**"],
      },
    },
    optimizeDeps: {
      include: ["appconfig"],
    },
    server: {
      port: DEV_PORT,
    },
    ssgOptions: {
      script: "async",
      formatting: "minify",
      // https://github.com/GoogleChromeLabs/critters#critters-1
      crittersOptions: {
        pruneSource: true,
      },
      onFinished() {
        generateSitemap();
      },
    },
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      setupFiles: ["vitest.setup.ts"],
      dir: "src",
      reporters: ["default", "html"],
      outputFile: {
        html: "./test-results/unit/html/index.html",
      },
      transformMode: {
        web: [/\.[jt]sx$/], // To make it work with defineComponent and tsx
      },
      coverage: {
        all: false,
        include: [
          "src/components/**",
          "src/composables/**",
          "src/utils/**",
          "src/helpers/**",
          // Exclude
          "!src/components/example",
        ],
        reporter: ["text", "json-summary"],
        reportsDirectory: "./test-results/unit",
      },
    },
  };
});
