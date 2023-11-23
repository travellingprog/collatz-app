import {
  bignumberDependencies,
  BigNumber,
  create,
  gcdDependencies,
} from "mathjs";

// Creating custom mathjs functions, with higher precision
const { bignumber: big, gcd } = create(
  {
    bignumberDependencies,
    gcdDependencies,
  },
  {
    precision: 1000000000, // highest possible precision
  },
);

/**
 * An assertion for the Typescript type checker to understand that a value should not be null.
 * Taken from the Typescript docs.
 */
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

/**
 * The Collatz loop creator, from an algorithm devised by Viktor Zivojinovic.
 */
export class Loop {
  multiplier: BigNumber;
  denominator: BigNumber;
  numerator: BigNumber;
  sequence: BigNumber[];

  constructor(multiplerNum: number, evenSegmentsNum: number[]) {
    const multiplier = big(multiplerNum);
    const evenSegments = evenSegmentsNum.map((num) => big(num));

    // if multiplier is even, check that all even segments are the required minimum length
    if (multiplier.mod(2).equals(0)) {
      let minimum = 1;

      while (multiplier.mod(big(2).pow(minimum)).equals(0)) {
        minimum++;
      }

      if (evenSegments.some((segment) => segment.lessThan(minimum))) {
        throw Error(
          `The multiplier value, ${multiplier}, is even` +
            `and  requires all segments to have at least ${minimum} even numbers`,
        );
      }
    }

    let decreaseCounter = big(0);
    const totalDecrease = [big(0)];
    for (const segment of evenSegments) {
      decreaseCounter = decreaseCounter.add(segment);
      totalDecrease.push(decreaseCounter);
    }

    const exponent = evenSegments.length;

    let numerator = big(0);
    for (let x = 0; x < exponent; x++) {
      const firstTerm = multiplier.pow(exponent - x - 1);
      const secondTerm = big(2).pow(totalDecrease[x]);
      numerator = numerator.add(firstTerm.mul(secondTerm));
    }

    const lastDecrease = totalDecrease.at(-1);
    assertIsDefined(lastDecrease);
    let denominator: BigNumber = big(2)
      .pow(lastDecrease)
      .minus(multiplier.pow(exponent));

    const divisor = gcd(numerator, denominator.abs());
    // ^ abs() use required because of issue https://github.com/josdejong/mathjs/issues/3087

    numerator = numerator.div(divisor);
    denominator = denominator.div(divisor);

    let loopNumber = numerator;
    const sequence = [loopNumber];

    for (const segmentNum of evenSegmentsNum) {
      loopNumber = loopNumber.mul(multiplier).plus(denominator);
      sequence.push(loopNumber);

      for (let y = 0; y < segmentNum; y++) {
        loopNumber = loopNumber.div(2).floor();
        sequence.push(loopNumber);
      }
    }

    this.multiplier = multiplier;
    this.denominator = denominator;
    this.numerator = numerator;
    this.sequence = sequence;
  }
}
