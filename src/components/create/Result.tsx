import { memo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";

import { Loop } from "@/lib/collatzLoop";

type Props = {
  error: Error | null;
  isPending: boolean;
  loop: Loop | null;
};

const EquationHighlight = styled("span")(({ theme }) => ({
  color: theme.palette.info.main,
  fontWeight: theme.typography.fontWeightBold,
}));

const LoopContainer = styled("div")(({ theme }) => ({
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: theme.palette.primary.light,
  fontFamily: "monospace",
  fontSize: "1rem",
  maxHeight: "30rem",
  overflow: "auto",
  padding: theme.spacing(2),
}));

const ResultsText = styled("div")(({ theme }) => ({
  ...theme.typography.h6,
  wordBreak: "break-word",
}));

/**
 * The box on the Create page where the resulting Loop is
 * explained and shown.
 */
const Result = memo(function Result(props: Props) {
  const { error, isPending, loop } = props;
  const theme = useTheme();

  const equation = loop
    ? `${loop.multiplier}x ${
        loop.denominator.isNeg() ? "-" : "+"
      } ${loop.denominator.abs().toFixed(0)}`
    : "";

  return (
    <Paper
      component="section"
      elevation={1}
      sx={{ minHeight: "25rem" }}
      aria-label="Result"
    >
      {!loop && !isPending && !error && (
        <Box padding={4}>
          <ResultsText sx={{ fontStyle: "italic", fontWeight: 400 }}>
            Your loop and its algorithm will appear here.
          </ResultsText>
        </Box>
      )}
      {isPending && (
        <Box padding={4}>
          <ResultsText sx={{ fontStyle: "italic", fontWeight: 400 }}>
            Calculating...
          </ResultsText>
        </Box>
      )}
      {error && (
        <Box padding={4}>
          <ResultsText sx={{ color: "error.main" }}>
            A problem occured:
            <br />
            <Box fontSize="0.8em">{error.message}</Box>
          </ResultsText>
        </Box>
      )}
      {loop && !isPending && !error && (
        <Box padding={4}>
          <ResultsText>
            Your Collatz loop algorithm is:
            <br />
            &bull; for{" "}
            <Box color={theme.loopNumber.odd} component="span">
              odd numbers
            </Box>
            , calculate <EquationHighlight>{equation}</EquationHighlight>
            <br />
            &bull; for{" "}
            <Box color={theme.loopNumber.even} component="span">
              even numbers
            </Box>
            , calculate <EquationHighlight>x / 2</EquationHighlight>
          </ResultsText>
          <ResultsText sx={{ marginTop: "1.5rem" }}>
            and starts at the number{" "}
            <EquationHighlight>{loop.numerator.toFixed(0)}</EquationHighlight>.
          </ResultsText>
          <LoopContainer sx={{ marginTop: 2 }}>
            {loop.sequence.map((loopElem, idx) => (
              <Box
                color={
                  loopElem.mod(2).equals(0)
                    ? theme.loopNumber.even
                    : theme.loopNumber.odd
                }
                key={idx}
              >
                {loopElem.toFixed(0)}
              </Box>
            ))}
          </LoopContainer>
        </Box>
      )}
    </Paper>
  );
});

export default Result;
