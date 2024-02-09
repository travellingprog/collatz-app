/**
 * This component is copied from the official Material UI + Next JS Pages example
 * https://github.com/mui/material-ui/blob/eabff88ac7e2b35b2b30c5383ea77e13e56ef3cf/examples/material-ui-nextjs-pages-router-ts/src/Link.tsx
 *
 * This Link component has the design/behavior of the Material UI Link, with the router
 * integration of the NextJS Link.
 */
import clsx from "clsx";
import { forwardRef } from "react";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { styled } from "@mui/material/styles";

// Add support for the sx prop for consistency with the other Material UI components
const Anchor = styled("a")({});

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      NextLinkProps,
      "href" | "as" | "passHref" | "onMouseEnter" | "onClick" | "onTouchStart"
    > {
  to: NextLinkProps["href"];
  linkAs?: NextLinkProps["as"];
}

export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  // href: NextLinkProps["href"];
  href: string;
  linkAs?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkAs" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = "active",
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      prefetch,
      replace,
      role, // Link don't have roles.
      scroll,
      shallow,
      ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === "string" ? href : href.pathname;
    const className = clsx(classNameProps, {
      [activeClassName]: router.pathname === pathname && activeClassName,
    });

    // if the target is an external website, use a regular <a> or a Material UI link
    // const isExternal =
    //   typeof href === "string" &&
    //   (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

    // if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
    // }

    // const linkAs = linkAsProp || as;
    // const nextjsProps = {
    //   to: href,
    //   linkAs,
    //   replace,
    //   scroll,
    //   shallow,
    //   prefetch,
    //   legacyBehavior,
    //   locale,
    // };

    // if (noLinkStyle) {
    //   return (
    //     <NextLinkComposed
    //       className={className}
    //       ref={ref}
    //       {...nextjsProps}
    //       {...other}
    //     />
    //   );
    // }

    // return (
    //   <MuiLink
    //     component={NextLinkComposed}
    //     className={className}
    //     ref={ref}
    //     {...nextjsProps}
    //     {...other}
    //   />
    // );
  },
);

export default Link;
