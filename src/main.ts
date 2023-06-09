import "./assets/styles/main.scss";

import devalue from "@nuxt/devalue";
import { setupLayouts } from "virtual:generated-layouts";
import type { ViteSSGContext } from "vite-ssg";
import { ViteSSG } from "vite-ssg";
import { routes } from "vue-router/auto/routes";

import { version } from "../package.json";
import Root from "./Root.vue";

type Module = { install: (args: ViteSSGContext<true>) => void };

export const createApp = ViteSSG(
  Root,
  { routes: setupLayouts(routes), base: import.meta.env.BASE_URL },
  ctx => {
    const globalProperties = ctx.app.config.globalProperties;
    const modules = import.meta.glob<Module>("./modules/*.ts", {
      eager: true,
    });

    for (const path in modules) {
      const module = modules[path];
      module.install?.(ctx);
    }

    globalProperties.$img = useAssetImage;
    globalProperties.$appVersion = version;
    globalProperties.$appName = import.meta.env.VITE_APP_TITLE;
  },
  {
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state;
    },
  }
);

function useAssetImage(url: string) {
  return new URL(`/src/assets/img/${url}`, import.meta.url).href;
}
