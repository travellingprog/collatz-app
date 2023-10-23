import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "@/styles/Create.module.css";

let idCounter = 1;
const inter = Inter({ subsets: ["latin"] });

export default function Create() {
  const [multiplier, setMultiplier] = useState(3);
  const [evenSegments, setEvenSegments] = useState([{ id: idCounter, val: 1 }]);
  const [showResult, setShowResult] = useState(false);

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

  function onAddSegment() {
    setEvenSegments((arr) => arr.concat({ id: ++idCounter, val: 1 }));
  }

  function onRemoveSegment(n: number) {
    setEvenSegments((arr) => {
      return [...arr.slice(0, n), ...arr.slice(n + 1)];
    });
  }

  function onFinishLoop(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = evenSegments.map((segment) => segment.val);
    let message = `multiplier: ${multiplier}\n`;
    message += `evenSegments: ${values.join(", ")}`;
    setShowResult(true);
    alert(message);
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
                id="multiplier"
                min="1"
                name="multiplier"
                onChange={(e) => setMultiplier(Number.parseInt(e.target.value))}
                type="number"
                value={multiplier}
              />
            </div>
            {evenSegments.map((segment, n) => (
              <div className={styles.formRow} key={segment.id}>
                <label htmlFor={`even-segment-${segment.id}`}>
                  Segment {n + 1}: amount of even numbers
                </label>
                <input
                  className={styles.input}
                  id={`even-segment-${segment.id}`}
                  name={`even-segment-${segment.id}`}
                  onChange={(e) => onSegmentChange(e, n, segment.id)}
                  type="number"
                  value={segment.val}
                />
                {n > 0 && (
                  <button
                    className={styles.btn}
                    onClick={() => onRemoveSegment(n)}
                    type="button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <div className={styles.btnRow}>
              <button
                className={styles.btn}
                onClick={onAddSegment}
                type="button"
              >
                Add Segment
              </button>
              <button className={styles.btn} type="submit">
                Finish Loop
              </button>
            </div>
          </form>
        </section>

        {showResult && (
          <section className={styles.section}>
            <div>[visual representation]</div>
            <div>Your loop is 5X + 971 and looks like this</div>
            <div>
              5017
              <br />
              26056 <br />
              ... etc.
            </div>
          </section>
        )}
      </main>
    </>
  );
}
