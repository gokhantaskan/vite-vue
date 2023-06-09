import "@vue/runtime-core";

export {};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $img: (url: string) => URL.href;
    $appName: string;
    $appVersion: string;
  }
}
