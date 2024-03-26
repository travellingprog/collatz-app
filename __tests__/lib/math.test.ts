/**
 * @vitest-environment node
 */
import { describe, expect, test } from "vitest";
import { big, isEven, isNumber } from "@/lib/math";

describe("isEven()", () => {
  test("return True if a BigNumber is even", () => {
    expect(isEven(big(16))).toBe(true);
    expect(isEven(big(0))).toBe(true);
    expect(isEven(big(-8))).toBe(true);
  });

  test("returns False if a BigNumber is not even", () => {
    expect(isEven(big(25))).toBe(false);
    expect(isEven(big(1))).toBe(false);
    expect(isEven(big(-1))).toBe(false);
    expect(isEven(big(Number.POSITIVE_INFINITY))).toBe(false);
  });
});

describe("isNumber()", () => {
  test("returns True for finite numerical values", () => {
    expect(isNumber(5)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(3.45)).toBe(true);
    expect(isNumber("1.23")).toBe(true);
    expect(isNumber(big("1.2e100"))).toBe(true);
  });

  test("returns False for non-numerical or non-finite values", () => {
    expect(isNumber("")).toBe(false);
    expect(isNumber("abc")).toBe(false);
    expect(isNumber("123abc")).toBe(false);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
  });
});
