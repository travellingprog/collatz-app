import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Link from "@/components/Link";
import type { StaticRequired } from "@/components/AppLayout";

export const getStaticProps = (async () => {
  return {
    props: {
      description: "Create your own Collatz Loop with your desired behavior",
    },
  };
}) satisfies StaticRequired;

const Title = styled("h1")(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "6rem",
  marginBottom: "1rem",
}));

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Box component="header" textAlign="center">
        <Typography variant="h1" component="div">
          <Box component="span" color="primary.light">
            3
          </Box>
          X +{" "}
          <Box component="span" color="secondary.light">
            1
          </Box>
        </Typography>
        <Typography variant="subtitle1" component="div">
          1 4 2 1 4 2 1 4 2 1 4 2 1 4 2 1
        </Typography>
        <Title>
          Collatz{" "}
          <Box component="span" color="secondary.light">
            Loops
          </Box>
        </Title>
      </Box>

      <Box component="section" textAlign="center">
        <Typography variant="h3" component="div">
          Create your own Collatz Loop
          <br /> that behaves how you wish.
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          component={Link}
          href="/more-info"
          size="large"
          sx={{ fontSize: "1.2rem" }}
          variant="outlined"
        >
          More Info
        </Button>
        <Button
          color="success"
          component={Link}
          href="/create"
          size="large"
          sx={{ fontSize: "1.2rem", marginLeft: "5rem" }}
          variant="contained"
        >
          Start
        </Button>
      </Box>

      <Box component="footer" textAlign="center" mt={16}>
        <Typography variant="body1">
          By Viktor Zivojinovic
          <br />
          Website Design by Erick Cardenas Mendez
        </Typography>
      </Box>
    </Container>
  );
}
