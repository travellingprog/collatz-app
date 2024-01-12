import { useState, ChangeEvent, FormEvent, Fragment } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import MultiplierSelector from "@/components/create/MultiplierSelector";
import Result from "@/components/create/Result";
import { Loop } from "@/lib/collatzLoop";
import type { StaticRequired } from "@/components/common/AppLayout";
import type { EvenSegment } from "@/lib/types";

let idCounter = 1;

const init = {
  isPending: false,
  error: null,
  multiplier: 3,
  multiplierIsLocked: false,
  evenSegments: [] as EvenSegment[],
  loop: null,
};

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
  const theme = useTheme();
  const [isPending, setIsPending] = useState(init.isPending);
  const [error, setError] = useState<Error | null>(init.error);
  const [multiplier, setMultiplier] = useState(init.multiplier);
  const [multiplierIsLocked, setMultiplierIsLocked] = useState(
    init.multiplierIsLocked,
  );
  const [evenSegments, setEvenSegments] = useState<EvenSegment[]>(
    init.evenSegments,
  );
  const [loop, setLoop] = useState<Loop | null>(init.loop);
  const [segmentMin, setSegmentMin] = useState(1);
  const segmentMax = 10000;

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

  async function onFinish(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const evenSegmentsNum = evenSegments.map((segment) => segment.val);
    setIsPending(true);
    setError(null);

    // HACK: required for React to show loading state on screen
    await new Promise((resolve) => setTimeout(resolve));

    try {
      const loop = await Loop.create(multiplier, evenSegmentsNum);
      setLoop(loop);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("unknown issue occurred in createLoop()"));
      }
    }

    setIsPending(false);
  }

  function onReset() {
    setMultiplier(init.multiplier);
    setMultiplierIsLocked(init.multiplierIsLocked);
    setEvenSegments(init.evenSegments);
    setLoop(init.loop);
    setIsPending(init.isPending);
    setError(init.error);
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

      <Grid container mt={2} spacing={2}>
        <Grid item mt={3} xs={6}>
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
            <Box component="form" onSubmit={onFinish}>
              {/* Even Segments */}
              <Grid container columnSpacing={1} mt={2} rowSpacing={2}>
                <Grid item xs={12}>
                  Define the lengths of your{" "}
                  <Box color={theme.loopNumber.even} component="span">
                    Even Number
                  </Box>{" "}
                  segments
                  <Typography variant="caption" component="div" mb={1}>
                    min length: {segmentMin}, max length: {segmentMax}
                  </Typography>
                </Grid>

                {evenSegments.map((segment, n) => (
                  <Fragment key={segment.id}>
                    <Grid item xs={8}>
                      <TextField
                        disabled={!multiplierIsLocked}
                        fullWidth
                        id={`even-segment-${segment.id}`}
                        inputProps={{ min: segmentMin, max: segmentMax }}
                        label={`Segment ${n + 1}`}
                        name={`even-segment-${segment.id}`}
                        onChange={(e) => onSegmentChange(e, n, segment.id)}
                        type="number"
                        value={Number.isNaN(segment.val) ? "" : segment.val}
                      />
                    </Grid>
                    <Grid item xs={4}>
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
                  </Fragment>
                ))}

                <Grid item xs={12}>
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
                <Grid item xs={8} textAlign="center">
                  <Button
                    disabled={
                      !multiplierIsLocked ||
                      evenSegments.some(
                        ({ val }) =>
                          Number.isNaN(val) ||
                          val < segmentMin ||
                          val > segmentMax,
                      )
                    }
                    size="large"
                    startIcon={<DoneOutlineIcon />}
                    type="submit"
                    variant="contained"
                  >
                    Finish Loop
                  </Button>
                </Grid>
                <Grid item xs={4} textAlign="left">
                  <Button color="error" onClick={onReset} variant="text">
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
        <Grid item xs={6}>
          {/* Result */}
          <Result error={error} isPending={isPending} loop={loop} />
        </Grid>
      </Grid>
    </Container>
  );
}
