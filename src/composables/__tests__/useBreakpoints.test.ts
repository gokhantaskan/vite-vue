import { mount } from "@vue/test-utils";
import { breakPoints } from "appconfig";
import { describe, expect, test, vi } from "vitest";
import { nextTick } from "vue";

import { useBreakpoints } from "../useBreakpoints";

// Helper function to mock window.matchMedia
function mockMatchMedia(width: number) {
  window.matchMedia = vi.fn().mockImplementation(query => {
    const queryValue = parseInt(query.match(/\d+/)[0]);
    const matches = query.includes("max-width") ? width < queryValue : width >= queryValue;
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

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

  test("should detect mobile", async () => {
    mockMatchMedia(300);
    const wrapper = mount(TestComponent);
    await nextTick();
    expect(wrapper.text()).toContain("Mobile");
    expect(wrapper.text()).not.toContain("TabletOrHigher");
  });

  test("should detect tablet", async () => {
    mockMatchMedia(parseInt(breakPoints.sm));
    const wrapper = mount(TestComponent);
    await nextTick();
    expect(wrapper.text()).toContain("Tablet");
    expect(wrapper.text()).toContain("TabletOrHigher");
  });

  test("should detect desktop", async () => {
    mockMatchMedia(parseInt(breakPoints.md));
    const wrapper = mount(TestComponent);
    await nextTick();
    expect(wrapper.text()).toContain("Desktop");
    expect(wrapper.text()).toContain("TabletOrHigher");
  });
});
