import { Fragment } from "react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export const metadata: Metadata = {
  title: "Create",
  description: "Create your own Collatz Loop with your desired behavior",
};

export default function AboutLayout({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
