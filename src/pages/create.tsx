import { useState, ChangeEvent, FormEvent, Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import MultiplierSelector from "@/components/create/MultiplierSelector";
import { Loop } from "@/lib/collatzLoop";
import type { StaticRequired } from "@/components/common/AppLayout";
import type { EvenSegment } from "@/lib/types";

let idCounter = 1;

const init = {
  multiplier: 3,
  multiplierIsLocked: false,
  evenSegments: [] as EvenSegment[],
  loop: null,
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
  fontSize: "1.2rem",
  maxHeight: "30rem",
  overflow: "auto",
  padding: theme.spacing(2),
}));

export const getStaticProps = (async () => {
  return {
    props: {
      title: "Create",
      description: "Create your own Collatz Loop with your desired behavior",
    },
  };
}) satisfies StaticRequired;

/**
 * The page where the user can create their own loop.
 */
export default function Create() {
  const [multiplier, setMultiplier] = useState(init.multiplier);
  const [multiplierIsLocked, setMultiplierIsLocked] = useState(
    init.multiplierIsLocked,
  );
  const [evenSegments, setEvenSegments] = useState<EvenSegment[]>(
    init.evenSegments,
  );
  const [loop, setLoop] = useState<Loop | null>(init.loop);
  const [segmentMin, setSegmentMin] = useState(1);

  const equation = loop
    ? `${loop.multiplier}x ${
        loop.denominator.isNeg() ? "-" : "+"
      } ${loop.denominator.abs().toFixed(0)}`
    : "";

  function updateMultiplier(newMultiplier: number, newMin: number) {
    setMultiplier(newMultiplier);
    setSegmentMin(newMin);
    setEvenSegments((segments) => {
      // add the first segment if required
      if (segments.length === 0) {
        return [{ id: idCounter, val: newMin }];
      }

      // otherwise update any existing segment with a value below newMin
      return segments.map(({ id, val }) => {
        return { id, val: Math.max(val, newMin) };
      });
    });
  }

  function onAddSegment() {
    setEvenSegments((arr) => arr.concat({ id: ++idCounter, val: segmentMin }));
  }

  function onSegmentChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    n: number,
    id: number,
  ) {
    const newSegment = { id, val: Number.parseInt(e.target.value) };
    setEvenSegments((arr) => {
      return [...arr.slice(0, n), newSegment, ...arr.slice(n + 1)];
    });
  }

  function onRemoveSegment(n: number) {
    setEvenSegments((arr) => {
      return [...arr.slice(0, n), ...arr.slice(n + 1)];
    });
  }

  function onFinishLoop(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const evenSegmentsNum = evenSegments.map((segment) => segment.val);
    setLoop(new Loop(multiplier, evenSegmentsNum));
  }

  function onReset() {
    setMultiplier(init.multiplier);
    setMultiplierIsLocked(init.multiplierIsLocked);
    setEvenSegments(init.evenSegments);
    setLoop(init.loop);
  }

  return (
    <Container maxWidth="lg" sx={{ marginY: 4 }}>
      {/* Example */}
      <Box component="section" textAlign="center">
        <Box display="inline-block" textAlign="left">
          <Box>
            <Typography variant="h3" component="div">
              <Box component="span" color="primary.light">
                3
              </Box>
              X +{" "}
              <Box component="span" color="secondary.light">
                1
              </Box>
            </Typography>
          </Box>

          <Box>
            <TurnRightIcon
              fontSize="large"
              sx={(theme) => ({
                color: theme.palette.primary.light,
                transform: "rotate(270deg)",
              })}
            />
            <Typography variant="h5" component="span" color="primary.light">
              Multiplier
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Multiplier */}
      <MultiplierSelector
        evenSegments={evenSegments}
        isLocked={multiplierIsLocked}
        multiplier={multiplier}
        onLockUpdate={setMultiplierIsLocked}
        onUpdate={updateMultiplier}
      />

      {/* Input Form */}
      {evenSegments.length > 0 && (
        <Box component="form" onSubmit={onFinishLoop}>
          {/* Even Segments */}
          <Grid container columnSpacing={1} mt={4} rowSpacing={2}>
            {evenSegments.map((segment, n) => (
              <Fragment key={segment.id}>
                <Grid item xs={1} />
                <Grid item xs={8}>
                  <TextField
                    disabled={!multiplierIsLocked}
                    fullWidth
                    id={`even-segment-${segment.id}`}
                    inputProps={{ min: segmentMin }}
                    label={`Segment ${n + 1}: Amount of Even Numbers`}
                    name={`even-segment-${segment.id}`}
                    onChange={(e) => onSegmentChange(e, n, segment.id)}
                    type="number"
                    value={Number.isNaN(segment.val) ? "" : segment.val}
                  />
                </Grid>
                <Grid item xs={2}>
                  {evenSegments.length > 1 && (
                    <IconButton
                      aria-label="remove"
                      onClick={() => onRemoveSegment(n)}
                      size="large"
                      sx={{ height: (th) => th.spacing(7) }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Grid>
                <Grid item xs={1} />
              </Fragment>
            ))}

            <Grid item xs={1} />
            <Grid item xs={11}>
              <Button
                disabled={!multiplierIsLocked}
                onClick={onAddSegment}
                startIcon={<AddCircleOutlineIcon />}
                variant="outlined"
              >
                Add Segment
              </Button>
            </Grid>
          </Grid>

          {/* Finish or Reset */}
          <Grid container mt={6}>
            <Grid item xs={1} />
            <Grid item xs={8} textAlign="center">
              <Button
                disabled={
                  !multiplierIsLocked ||
                  evenSegments.some(({ val }) => Number.isNaN(val))
                }
                size="large"
                startIcon={<DoneOutlineIcon />}
                type="submit"
                variant="contained"
              >
                Finish Loop
              </Button>
            </Grid>
            <Grid item xs={2} textAlign="right">
              <Button color="error" onClick={onReset} variant="text">
                Reset
              </Button>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Box>
      )}

      {/* Result */}
      {loop && (
        <Paper component="section" elevation={3}>
          <Box padding={4} mt={4}>
            <Typography variant="h5" component="div">
              Your Collatz loop algorithm is:
              <br />
              &bull; when x is odd, calculate{" "}
              <EquationHighlight>{equation}</EquationHighlight>
              <br />
              &bull; when x is even, calculate{" "}
              <EquationHighlight>x / 2</EquationHighlight>
            </Typography>
            <Typography variant="h5" component="div" mt={2}>
              and starts at the number{" "}
              <EquationHighlight>{loop.numerator.toFixed(0)}</EquationHighlight>
            </Typography>
            <LoopContainer sx={{ marginTop: 2 }}>
              {loop.sequence.map((loopElem, idx) => (
                <Box
                  color={
                    loopElem.mod(2).equals(0)
                      ? "secondary.main"
                      : "primary.dark"
                  }
                  key={idx}
                >
                  {loopElem.toFixed(0)}
                </Box>
              ))}
            </LoopContainer>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
