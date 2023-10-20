import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Create.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Create() {
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

          <form>
            <div className={styles.formRow}>
              <label htmlFor="multiplier">Choose your multipler</label>
              <input
                className={styles.input}
                type="number"
                name="multiplier"
                id="multiplier"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="even-numbers-1">Number of even numbers</label>
              <input
                className={styles.input}
                type="number"
                name="even-numbers-1"
                id="even-numbers-1"
              />
            </div>
            <div className={styles.btnRow}>
              <button className={styles.btn}>Add Segment</button>
              <button className={styles.btn}>Finish Loop</button>
            </div>
          </form>
        </section>

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
      </main>
    </>
  );
}
