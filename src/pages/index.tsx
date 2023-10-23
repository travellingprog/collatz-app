import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Collatz Loops</title>
        <meta
          name="description"
          content="Create your own Collatz Loop with your desired behavior"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <header>
          <div>3X + 1</div>
          <div>1 4 2 1 4 2 1 4 2 1 4 2 1 4 2 1</div>
          <h1>Collatz Loops</h1>
        </header>

        <section className={styles.section}>
          <div>Create your own Collatz Loop that behaves how you wish.</div>
          <div className={styles.links}>
            <Link className={styles.link} href="/more-info">
              More Info
            </Link>
            <Link className={styles.link} href="/create">
              Start
            </Link>
          </div>
        </section>

        <footer className={styles.footer}>
          By Viktor Zivojinovic
          <br />
          Website Design by Erick Cardenas Mendez
        </footer>
      </main>
    </>
  );
}
