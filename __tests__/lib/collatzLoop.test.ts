/**
 * @jest-environment node
 */
import { describe, expect, test } from "@jest/globals";
import { Loop } from "@/lib/collatzLoop";

describe("Loop", () => {
  test.each([
    {
      multiplier: 5,
      evenSegments: [3, 2],
      denominator: "7",
      numerator: "13",
    },
    {
      multiplier: 11,
      evenSegments: [4, 6, 5],
      denominator: "31437",
      numerator: "1321",
    },
    {
      multiplier: 1,
      evenSegments: [2],
      denominator: "3",
      numerator: "1",
    },
    {
      multiplier: 20,
      evenSegments: [4, 12, 3, 4],
      denominator: "128572",
      numerator: "28897",
    },
    {
      multiplier: 7,
      evenSegments: [15, 10, 5],
      denominator: "1073741481",
      numerator: "33783857",
    },
    {
      multiplier: 1000,
      evenSegments: [55, 12, 4, 40],
      denominator: "5070602400912917605984859696504",
      numerator: "363210806347805085029",
    },
    {
      multiplier: -3,
      evenSegments: [1, 1, 4],
      denominator: "13",
      numerator: "1",
    },
    {
      multiplier: 3,
      evenSegments: [1, 1, 1, 2, 1, 1, 4],
      denominator: "-1",
      numerator: "17",
    },
    {
      multiplier: -3,
      evenSegments: [1, 1, 1, 1, 1, 2, 1, 3, 1, 3, 2, 2],
      denominator: "-1",
      numerator: "-13",
    },
    // Fails:
    {
      multiplier: 97,
      evenSegments: [1, 364, 1, 1],
      denominator:
        "300613450595050653169853516389035139504087366260264943450533244356122755214669880763353471793250393987999147647",
      numerator:
        "7440182902227503665953874530628619702726162314941557350400697797814038191563079548892998426882947251205170935459",
    },
  ])("Loop($multiplier, $evenSegments)", (t) => {
    const loop = new Loop(t.multiplier, t.evenSegments);
    expect(loop.multiplier.toFixed(0)).toBe(t.multiplier.toFixed(0));
    expect(loop.denominator.toFixed(0)).toBe(t.denominator);
    expect(loop.numerator.toFixed(0)).toBe(t.numerator);
  });
});
