import { useBreakpoints as useBp } from "@vueuse/core";
import { breakPoints } from "appconfig";

export function useBreakpoints() {
  const breakpoints = useBp(breakPoints);

  return {
    isMobile: breakpoints.smaller("sm"),
    isTablet: breakpoints.between("sm", "md"),
    isDesktop: breakpoints.greater("md"),
    isTabletOrHigher: breakpoints.greaterOrEqual("sm"),
    current: breakpoints.current,
  };
}
