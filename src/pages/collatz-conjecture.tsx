import Head from "next/head";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/CollatzConjecture.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function MoreInfo() {
  return (
    <>
      <Head>
        <title>Collatz Conjecture | Collatz Loops</title>
        <meta
          name="description"
          content="Learn more about Collatz Conjecture"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <section className={styles.ad}>[AD HERE]</section>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
        </nav>

        <section>
          <h1>Collatz Conjecture</h1>
          <p>Under Construction</p>
        </section>
      </main>
    </>
  );
}
