import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Link from "@/components/Link";
import type { StaticRequired } from "@/components/AppLayout";

export const getStaticProps = (async () => {
  return {
    props: {
      title: "More Info",
      description: "Information on this Collatz Loops application",
    },
  };
}) satisfies StaticRequired;

const Paragraph = styled("p")({
  fontSize: "1.5rem",
});

export default function MoreInfo() {
  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Typography variant="h2" component="h1">
        About This Website
      </Typography>
      <Paragraph>
        The Collatz Conjecture is an unsolved problem in mathematics. The
        conjecture involves a sequence where you start at a number. To find the
        next number, you multiply it by 3 and add 1 when the number is odd, or
        you divide it by 2 if the number is even, and then repeat the process
        with the next number. The conjecture is that no matter what positive
        number you begin with, you will always eventually reach the loop of 1,
        4, 2, 1.
      </Paragraph>
      <Paragraph>
        This website was made utilizing a formula that will produce{" "}
        <strong>almost</strong> every possible loop, with the caveat that the
        addition can be any number instead of just +1, and the multiplier can be
        any number, not just -1.
      </Paragraph>
      <Paragraph>
        The formula utilized does calculate every possible loop. However this
        website simplifies the formula in a few ways:
        <br />
        &bull; This website only shows the loop in “smallest terms”
        <br />
        &bull; This website only looks at loops where each segment of even
        numbers has a minimum size of 1 (or specifically, 1 + the number of
        times the multiplier is a factor of the divisor)
      </Paragraph>
      <Paragraph>
        If you wish to learn more about the Collatz conjecture, I highly
        recommend watching{" "}
        <Link href="https://www.youtube.com/watch?v=094y1Z2wpJg">
          Veritasium&rsquo;s video on the subject
        </Link>
        .
      </Paragraph>
    </Container>
  );
}
