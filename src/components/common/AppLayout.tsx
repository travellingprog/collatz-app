import Head from "next/head";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import type { ReactNode } from "react";

import Link from "@/components/common/Link";
import logo from "../../../public/logo.svg";

export type StaticProps = {
  description: string;
  title?: string;
};

export type StaticRequired = GetStaticProps<StaticProps>;

type AppLayoutProps = StaticProps & {
  children: ReactNode;
};

type NavItemProps = {
  label: string;
  href: string;
  icon: ReactNode;
};

const drawerWidth = 256;

const navigationItems: NavItemProps[] = [
  {
    label: "Create Loop",
    href: "/create",
    icon: <AddCircleIcon color="primary" />,
  },
  {
    label: "More Info",
    href: "/more-info",
    icon: <InfoIcon color="info" />,
  },
];

function NavItem(props: NavItemProps) {
  const { pathname } = useRouter();
  const selected = pathname === props.href;

  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} href={props.href} selected={selected}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText
          primary={props.label}
          primaryTypographyProps={
            selected ? { color: "primary", variant: "h6" } : {}
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

/**
 * The layout that wraps the main page content.
 */
export default function AppLayout(props: AppLayoutProps) {
  const { children, description, title } = props;
  const pageTitle = `${title ? title + " | " : ""}Collatz Loops`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />

        {/* Cannot be in _document: https://nextjs.org/docs/messages/no-document-viewport-meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters sx={{ maxHeight: 64 }}>
          <Box
            mx="auto"
            position="absolute"
            py={1}
            textAlign="center"
            width={drawerWidth}
          >
            <Link href="/" noLinkStyle aria-label="Go to homepage">
              <Image src={logo} alt="logo" height={48} />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {/* Adding empty Toolbar to have content underneath AppBar */}
        <Toolbar />

        <Box component="nav" sx={{ overflow: "auto" }}>
          <List>
            {navigationItems.map((navItem) => (
              <NavItem key={navItem.href} {...navItem} />
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" ml={`${drawerWidth}px`}>
        {children}
      </Box>
    </>
  );
}
