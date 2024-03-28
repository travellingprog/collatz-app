import Box from "@mui/material/Box";
import MuiContainer from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";

import { BottomPageAd } from "@/components/common/Ads";

type PageContainerProps = { children: ReactNode };

function Container({ children }: PageContainerProps) {
  return (
    <Box>
      <MuiContainer maxWidth="lg" sx={{ marginY: { xs: 4, sm: 8 } }}>
        {children}
        <BottomPageAd />
      </MuiContainer>
    </Box>
  );
}

type TitleProps = { children: ReactNode; isMobile: boolean };

function Title({ children, isMobile }: TitleProps) {
  return (
    <Typography variant={isMobile ? "h3" : "h2"} component="h1">
      {children}
    </Typography>
  );
}

type ParagraphProps = { children: ReactNode; isMobile: boolean };

const Paragraph = styled("p", {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<ParagraphProps>(({ isMobile }) => ({
  fontSize: isMobile ? "1rem" : "1.5rem",
}));

/** Components to create a page that mainly contains text. */
const TextPage = {
  /** Overall page container */
  Container,
  /** Page title header */
  Title,
  /** A paragraph of text */
  Paragraph,
};

export default TextPage;
