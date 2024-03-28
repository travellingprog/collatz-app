import { Fragment } from "react";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export const metadata: Metadata = {
  title: "About",
  description: "Information on the application authors",
};

export default function AboutLayout({ children }: Props) {
  return <Fragment>{children}</Fragment>;
}
