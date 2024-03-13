import Link from "@/components/common/Link";
import TextPage from "@/components/common/TextPage";
import { useIsMobile } from "@/lib/hooks";
import type { StaticRequired } from "@/components/common/AppLayout";

export const getStaticProps = (async () => {
  return {
    props: {
      title: "More Info",
      description: "Information on this Collatz Loops application",
    },
  };
}) satisfies StaticRequired;

/** A page that provides information on the website application */
export default function MoreInfo() {
  const isMobile = useIsMobile();

  return (
    <TextPage.Container>
      <TextPage.Title isMobile={isMobile}>More Information</TextPage.Title>
      <TextPage.Paragraph isMobile={isMobile}>
        The Collatz Conjecture is an unsolved problem in mathematics. The
        conjecture involves a sequence where you start at a number. To find the
        next number, you multiply it by 3 and add 1 when the number is odd, or
        you divide it by 2 if the number is even, and then repeat the process
        with the next number. The conjecture is that no matter what positive
        number you begin with, you will always eventually reach the loop of 1,
        4, 2, 1.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        This website was made utilizing a formula that will produce every
        possible loop, with the caveat that the addition can be any number
        instead of just +1, and the multiplier can be any number, not just 3.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        The formula utilized does calculate every possible loop. However this
        website simplifies the formula in a few ways:
        <br />
        &bull; This website only shows the loop in “smallest terms”
        <br />
        &bull; This website only looks at loops where each segment of even
        numbers has a minimum size of 1 (or specifically, 1 + the number of
        times the multiplier is a factor of the divisor)
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        If you wish to learn more about the Collatz conjecture, I highly
        recommend watching{" "}
        <Link href="https://www.youtube.com/watch?v=094y1Z2wpJg">
          Veritasium&rsquo;s video on the subject
        </Link>
        .
      </TextPage.Paragraph>
    </TextPage.Container>
  );
}
