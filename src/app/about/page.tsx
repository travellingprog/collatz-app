"use client";
import TextPage from "@/components/common/TextPage";
import { useIsMobile } from "@/lib/hooks";

/** A page that provides information on the website authors */
export default function About() {
  const isMobile = useIsMobile();

  return (
    <TextPage.Container>
      <TextPage.Title isMobile={isMobile}>
        About The Website Author
      </TextPage.Title>
      <TextPage.Paragraph isMobile={isMobile}>
        The idea behind creating Collatz Loops comes from me,{" "}
        <strong>Viktor Zivojinovic</strong>. I had an interest in the Collatz
        Conjecture but what interested me was not proving/disproving the Collatz
        Conjecture but how loops within the same scope of rules of the Collatz
        Conjecture works. I made this website as a tool for people to tinker
        with and to approach the Collatz Conjecture in a different way - to not
        just focus on 3x + 1 but how the whole process works.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        I have a degree in mathematics and financial modeling, and I love
        solving and making logic puzzles, amongst many other hobbies.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        This website is I believe the first of its kind and I plan on expanding
        what this tool can do such as including multiplication, rational
        numbers, and complex numbers.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        Thank you to <strong>Erick Cardenas Mendez</strong> for creating this
        website and making this tool into a clean user-friendly experience, even
        when allowing numbers as large as 12,000 digits long.
      </TextPage.Paragraph>
      <TextPage.Paragraph isMobile={isMobile}>
        If you wish to contact me, please send me an email at:
        <br />
        Collatzloops at gmail dot com
      </TextPage.Paragraph>
    </TextPage.Container>
  );
}
