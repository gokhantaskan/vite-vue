import "@vue/runtime-core";

export {};

declare module "@vue/runtime-dom" {
  interface ComponentCustomProperties {
    $img: (url: string) => URL["href"];
    $appName: string;
    $appVersion: string;
  }
}
