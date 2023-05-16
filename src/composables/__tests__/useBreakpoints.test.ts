import { mount } from "@vue/test-utils";
import { breakPoints } from "appconfig";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { nextTick } from "vue";

import { useBreakpoints } from "../useBreakpoints";

const resizeWindow = async (width: number) => {
  // Change window.innerWidth in JSDOM
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });

  // Trigger the resize event
  window.dispatchEvent(new Event("resize"));

  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => {
      const maxWidth = query.includes("max-width") ? parseInt(query.match(/\d+/)[0]) : Infinity;
      const minWidth = query.includes("min-width") ? parseInt(query.match(/\d+/)[0]) : 0;
      return {
        matches: window.innerWidth >= minWidth && window.innerWidth <= maxWidth,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });

  // Wait for all microtasks to be completed
  await new Promise(resolve => setImmediate(resolve));
};

describe("useBreakpoints", () => {
  // Create a dummy component to test the useBreakpoints composable
  const TestComponent = {
    setup() {
      return { ...useBreakpoints() };
    },
    template: `
      <div>
        <span v-if="isMobile">Mobile</span>
        <span v-if="isTablet">Tablet</span>
        <span v-if="isDesktop">Desktop</span>
        <span v-if="isTabletOrHigher">TabletOrHigher</span>
      </div>
    `,
  };

  beforeEach(async () => {
    await resizeWindow(parseInt(breakPoints.sm));
  });

  test("should detect mobile", async () => {
    await resizeWindow(300);
    const wrapper = mount(TestComponent);
    await nextTick();
    console.log(wrapper.text());
    expect(wrapper.text().match(/^Mobile$/)).toBeTruthy();
  });

  test("should detect tablet", async () => {
    await resizeWindow(parseInt(breakPoints.sm));
    const wrapper = mount(TestComponent);
    await nextTick();
    console.log(wrapper.text());
    expect(wrapper.text().match(/^TabletTabletOrHigher$/)).toBeTruthy();
  });

  test("should detect desktop", async () => {
    await resizeWindow(parseInt(breakPoints.md));
    const wrapper = mount(TestComponent);
    await nextTick();
    console.log(wrapper.text());
    expect(wrapper.text().match(/^DesktopTabletOrHigher$/)).toBeTruthy();
  });
});
