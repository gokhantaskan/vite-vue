import "./assets/styles/main.scss";

import { createPinia } from "pinia";
import { createApp } from "vue";

import { version } from "../package.json";
import Root from "./Root.vue";
import router from "./router";

const app = createApp(Root);

app.use(createPinia());
app.use(router);

app.config.globalProperties.$img = useAssetImage;
app.config.globalProperties.$appName = import.meta.env.VITE_APP_NAME;
app.config.globalProperties.$appVersion = version;

app.mount("#app");

function useAssetImage(url: string) {
  return new URL(`/src/assets/img/${url}`, import.meta.url).href;
}
