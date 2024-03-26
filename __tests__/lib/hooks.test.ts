import mediaQuery from "css-mediaquery";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";

import { useIsMobile } from "@/lib/hooks";

describe("useIsMobile()", () => {
  beforeAll(() => {
    // based on https://github.com/mui/material-ui/blob/v5.14.17/docs/data/material/components/use-media-query/use-media-query.md#testing
    window.matchMedia = (query) => {
      return {
        matches: mediaQuery.match(query, { width: window.innerWidth }),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      };
    };
  });

  test("returns True if in a mobile-sized view", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(400);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  test("returns False if in a bigger view", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1200);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
