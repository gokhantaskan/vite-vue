import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import DivButton from "../DivButton/DivButton";

describe("DivButton", () => {
  it("gives error without press prop", () => {
    vi.spyOn(console, "warn");
    mount(DivButton);
    expect(console.warn).toHaveBeenCalled();
  });

  it("renders properly", () => {
    const wrapper = mount(DivButton, {
      props: { press: () => ({}) },
      slots: { default: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("Hello Vitest");
  });

  it("calls press function when clicked", async () => {
    const press = vi.fn();
    const wrapper = mount(DivButton, {
      props: { press },
    });
    await wrapper.trigger("click");
    expect(press).toHaveBeenCalled();
  });

  it("calls press function when enter or space is pressed", async () => {
    const press = vi.fn();
    const wrapper = mount(DivButton, {
      props: { press },
    });
    await wrapper.trigger("keydown", { key: "Enter" });
    await wrapper.trigger("keydown", { key: " " });
    expect(press).toBeCalledTimes(2);
  });

  it("does not call press function when it's disabled", async () => {
    const press = vi.fn();
    const wrapper = mount(DivButton, {
      props: { press, disabled: true },
    });
    await wrapper.trigger("click");
    expect(press).not.toHaveBeenCalled();
  });
});
