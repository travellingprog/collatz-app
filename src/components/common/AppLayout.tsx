import Head from "next/head";
import Image from "next/image";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useRouter } from "next/router";
import { useState } from "react";
import type { GetStaticProps } from "next";
import type { ReactNode } from "react";

import Link from "@/components/common/Link";
import { useIsMobile } from "@/lib/hooks";
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
    icon: <HelpIcon color="info" />,
  },
  {
    label: "About",
    href: "/about",
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

type NavListProps = {
  onClick?: () => void;
};

function NavList(props: NavListProps) {
  return (
    <Box component="nav" sx={{ overflow: "auto" }}>
      <List onClick={props.onClick}>
        {navigationItems.map((navItem) => (
          <NavItem key={navItem.href} {...navItem} />
        ))}
      </List>
    </Box>
  );
}

/**
 * The layout that wraps the main page content.
 */
export default function AppLayout(props: AppLayoutProps) {
  const { children, description, title } = props;
  const pageTitle = `${title ? title + " | " : ""}Collatz Loops`;

  const isMobile = useIsMobile();

  // mobile navigation state variables and methods
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

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
        sx={{ zIndex: (theme) => theme.zIndex.drawer + (isMobile ? -1 : 1) }}
      >
        <Toolbar disableGutters sx={{ maxHeight: 64, position: "relative" }}>
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              left="0"
              top="0"
              position="absolute"
              width={{ xs: "100%", sm: drawerWidth }}
            >
              <Link href="/" noLinkStyle aria-label="Go to homepage">
                <Image src={logo} alt="logo" height={48} />
              </Link>
            </Box>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open navigation menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              ml: 0,
              display: { sm: "none" },
              left: 0,
              position: "absolute",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <NavList onClick={handleDrawerToggle} />
        </Drawer>
      )}

      {/* Tablet/Desktop Navigation */}
      {!isMobile && (
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

          <NavList />
        </Drawer>
      )}

      {/* Main Content */}
      <Box component="main" ml={{ xs: 0, sm: `${drawerWidth}px` }}>
        {children}
      </Box>
    </>
  );
}
