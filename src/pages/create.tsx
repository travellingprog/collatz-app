import { bignumber as big } from "mathjs";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useMemo, useState, ChangeEvent, FormEvent } from "react";

import { Loop } from "@/lib/collatzLoop";
import styles from "@/styles/Create.module.css";

let idCounter = 1;
const inter = Inter({ subsets: ["latin"] });

type EvenSegment = {
  id: number;
  val: number;
};

const init = {
  multiplier: 3,
  multiplierIsLocked: false,
  evenSegments: [] as EvenSegment[],
  loop: null,
};

/**
 * The page where the user can create their own loop.
 */
export default function Create() {
  const [multiplier, setMultiplier] = useState(init.multiplier);
  const [multiplierIsLocked, setMultiplierIsLocked] = useState(
    init.multiplierIsLocked,
  );
  const [evenSegments, setEvenSegments] = useState<EvenSegment[]>(
    init.evenSegments,
  );
  const [loop, setLoop] = useState<Loop | null>(init.loop);

  const multiplerIsEven = useMemo(() => {
    if (Number.isNaN(multiplier)) {
      // multiplier is blank
      return false;
    }

    return big(multiplier || 0)
      .mod(2)
      .equals(0);
  }, [multiplier]);

  // if the multiplier is even, calculate the required minimum lenght
  // of every "even numbers" segment in the loop
  const segmentMin = useMemo(() => {
    let min = 1;
    const bigMultiplier = big(multiplier || 0);
    if (multiplerIsEven && !bigMultiplier.isZero()) {
      while (bigMultiplier.mod(big(2).pow(min)).equals(0)) {
        min++;
      }
    }

    return min;
  }, [multiplier, multiplerIsEven]);

  const equation = loop
    ? `${loop.multiplier}x ${
        loop.denominator.isNeg() ? "-" : "+"
      } ${loop.denominator.abs().toFixed(0)}`
    : "";

  function updateMultiplier() {
    setMultiplierIsLocked(true);
    setEvenSegments((segments) => {
      // add the first segment if required
      if (segments.length === 0) {
        return [{ id: idCounter, val: segmentMin }];
      }

      // otherwise update any existing segment with a value below segmentMin
      return segments.map(({ id, val }) => {
        return { id, val: Math.max(val, segmentMin) };
      });
    });
  }

  function onAddSegment() {
    setEvenSegments((arr) => arr.concat({ id: ++idCounter, val: segmentMin }));
  }

  function onSegmentChange(
    e: ChangeEvent<HTMLInputElement>,
    n: number,
    id: number,
  ) {
    const newSegment = { id, val: Number.parseInt(e.target.value) };
    setEvenSegments((arr) => {
      return [...arr.slice(0, n), newSegment, ...arr.slice(n + 1)];
    });
  }

  function onRemoveSegment(n: number) {
    setEvenSegments((arr) => {
      return [...arr.slice(0, n), ...arr.slice(n + 1)];
    });
  }

  function onFinishLoop(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const evenSegmentsNum = evenSegments.map((segment) => segment.val);
    setLoop(new Loop(multiplier, evenSegmentsNum));
  }

  function onReset() {
    setMultiplier(init.multiplier);
    setMultiplierIsLocked(init.multiplierIsLocked);
    setEvenSegments(init.evenSegments);
    setLoop(init.loop);
  }

  return (
    <>
      <Head>
        <title>Create | Collatz Loops</title>
        <meta
          name="description"
          content="Create your own Collatz Loop with your desired behavior"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <section className={styles.ad}>[AD HERE]</section>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
        </nav>

        <section className={styles.section}>
          <div className={styles.example}>3X + 1</div>

          <form onSubmit={onFinishLoop}>
            <div className={styles.formRow}>
              <label htmlFor="multiplier">Choose your multipler</label>
              <input
                className={styles.input}
                disabled={multiplierIsLocked}
                id="multiplier"
                name="multiplier"
                onChange={(e) => setMultiplier(Number.parseInt(e.target.value))}
                type="number"
                value={Number.isNaN(multiplier) ? "" : multiplier}
              />
              {multiplierIsLocked ? (
                <button
                  className={styles.btn}
                  onClick={() => setMultiplierIsLocked(false)}
                  type="button"
                >
                  Update
                </button>
              ) : (
                <button
                  className={styles.btn}
                  disabled={Number.isNaN(multiplier)}
                  onClick={updateMultiplier}
                  type="button"
                >
                  Set Multiplier
                </button>
              )}
            </div>
            {!multiplierIsLocked && multiplerIsEven && (
              <div className={styles.evenWarning}>
                When the multiplier is even, then each segment in the loop needs
                a minimum amount of even numbers. <br />
                For your chosen multiplier, every segment will need to have at
                least <strong>{segmentMin}</strong> even number
                {segmentMin > 1 ? "s" : ""}.
              </div>
            )}
            {!multiplierIsLocked &&
              multiplerIsEven &&
              evenSegments.some(({ val }) => val < segmentMin) && (
                <div className={styles.updateWarning}>
                  Setting this multiplier will automatically increase some of
                  your segments to a value of {segmentMin}.
                </div>
              )}

            {evenSegments.map((segment, n) => (
              <div className={styles.formRow} key={segment.id}>
                <label htmlFor={`even-segment-${segment.id}`}>
                  Segment {n + 1}: amount of even numbers
                </label>
                <input
                  className={styles.input}
                  disabled={!multiplierIsLocked}
                  id={`even-segment-${segment.id}`}
                  min={segmentMin}
                  name={`even-segment-${segment.id}`}
                  onChange={(e) => onSegmentChange(e, n, segment.id)}
                  type="number"
                  value={Number.isNaN(segment.val) ? "" : segment.val}
                />
                {evenSegments.length > 1 && (
                  <button
                    className={styles.btn}
                    disabled={!multiplierIsLocked}
                    onClick={() => onRemoveSegment(n)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {evenSegments.length > 0 && (
              <>
                <div className={styles.btnRow}>
                  <button
                    className={styles.btn}
                    disabled={!multiplierIsLocked}
                    onClick={onAddSegment}
                    type="button"
                  >
                    Add Segment
                  </button>
                  <button
                    className={styles.btn}
                    disabled={
                      !multiplierIsLocked ||
                      evenSegments.some(({ val }) => Number.isNaN(val))
                    }
                    type="submit"
                  >
                    Finish Loop
                  </button>
                </div>
                <div className={styles.resetRow}>
                  <button
                    className={styles.btn}
                    onClick={onReset}
                    type="button"
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </form>
        </section>

        {loop && (
          <section className={styles.section}>
            <div>[visual representation]</div>
            <div className={styles.equation}>
              Your Collatz loop algorithm is:
              <br />
              &bull; if x is odd, calculate <strong>{equation}</strong>
              <br />
              &bull; if x is even, calculate <strong>x / 2</strong>
            </div>
            <div className={styles.equation}>
              and starts at the number x=
              <strong>{loop.numerator.toFixed(0)}</strong>
            </div>
            <div className={styles.loop}>
              {loop.sequence.map((loopElem, idx) => (
                <div
                  className={loopElem.mod(2).equals(0) ? styles.even : ""}
                  key={idx}
                >
                  {loopElem.toFixed(0)}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
