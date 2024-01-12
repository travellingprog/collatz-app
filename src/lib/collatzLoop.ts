import { big, BigNumber, gcd, isEven } from "@/lib/math";

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

  /** Loop constructor, only to be used directly by test functions */
  constructor(
    multiplier: BigNumber,
    denominator: BigNumber,
    numerator: BigNumber,
    sequence: BigNumber[],
  ) {
    this.multiplier = multiplier;
    this.denominator = denominator;
    this.numerator = numerator;
    this.sequence = sequence;
  }

  /** An async Loop creator. The calculations required may take time */
  static async create(
    multiplier: BigNumber,
    evenSegments: BigNumber[],
  ): Promise<Loop> {
    // if multiplier is even, check that all even segments are the required minimum length
    const segmentMin = Loop.calcSegmentMin(multiplier);
    if (evenSegments.some((segment) => segment.lessThan(segmentMin))) {
      throw Error(
        `The multiplier value, ${multiplier}, is even ` +
          `and requires all segments to have at least ${segmentMin} even numbers`,
      );
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
    /*
       ^ abs() use required because of issue https://github.com/josdejong/mathjs/issues/3087
       Also, upgrading to mathjs v12 causes tests to fail with
       "Fatal JavaScript invalid size error 169220804 (see crbug.com/1201626)".
    */

    numerator = numerator.div(divisor);
    denominator = denominator.div(divisor);

    let loopNumber = numerator;
    const sequence = [loopNumber];

    for (const segment of evenSegments) {
      loopNumber = loopNumber.mul(multiplier).plus(denominator);
      sequence.push(loopNumber);

      for (let y = big(0); y.lt(segment); y = y.plus(1)) {
        loopNumber = loopNumber.div(2).floor();
        sequence.push(loopNumber);
      }
    }

    return new Loop(multiplier, denominator, numerator, sequence);
  }

  /**
   * Calculate the minimum length that the Even Number segments need to be,
   * for a given multiplier.
   */
  static calcSegmentMin(multiplier: BigNumber): BigNumber {
    let segmentMin = big(1);
    if (isEven(multiplier) && !multiplier.isZero()) {
      const two = big(2);

      while (multiplier.mod(two.pow(segmentMin)).equals(0)) {
        segmentMin = segmentMin.plus(1);
      }
    }

    return segmentMin;
  }
}
