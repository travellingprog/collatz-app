import {
  bignumberDependencies,
  BigNumber,
  create,
  gcdDependencies,
  maxDependencies,
} from "mathjs";

// Creating custom mathjs functions, with higher precision
const {
  bignumber: big,
  gcd,
  max,
} = create(
  {
    bignumberDependencies,
    gcdDependencies,
    maxDependencies,
  },
  {
    precision: 1000000000, // highest possible precision
  },
);

function isNumber(value: unknown): boolean {
  try {
    return big(value as number).isFinite();
  } catch (e) {
    return false;
  }
}

function isEven(bigNumber: BigNumber): boolean {
  return bigNumber.isFinite() && bigNumber.mod(2).equals(0);
}

export { big, gcd, isEven, isNumber, max };
export type { BigNumber };
