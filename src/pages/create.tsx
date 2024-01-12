import { useState, FormEvent, Fragment } from "react";
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
import Typography from "@mui/material/Typography";

import BigNumberInput from "@/components/common/BigNumberInput";
import MultiplierSelector from "@/components/create/MultiplierSelector";
import Result from "@/components/create/Result";
import { Loop } from "@/lib/collatzLoop";
import { BigNumber, big, isNumber, max } from "@/lib/math";

import type { StaticRequired } from "@/components/common/AppLayout";
import type { EvenSegment } from "@/lib/types";

let idCounter = 1;
const initMultiplier = big(3);

const init = {
  isPending: false,
  error: null,
  multiplier: initMultiplier,
  multiplierIsLocked: false,
  evenSegments: [] as EvenSegment[],
  loop: null,
  segmentMin: Loop.calcSegmentMin(initMultiplier),
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
  const [segmentMin, setSegmentMin] = useState(init.segmentMin);
  const segmentMax = big(10000);

  function updateMultiplier(newMultiplier: BigNumber, newMin: BigNumber) {
    setMultiplier(newMultiplier);
    setSegmentMin(newMin);
    setEvenSegments((segments) => {
      // add the first segment if required
      if (segments.length === 0) {
        return [{ id: idCounter, val: newMin }];
      }

      // otherwise update any existing segment with a value below newMin
      return segments.map(({ id, val }) => {
        return { id, val: max(val, newMin) };
      });
    });
  }

  function onAddSegment() {
    setEvenSegments((arr) => arr.concat({ id: ++idCounter, val: segmentMin }));
  }

  function onSegmentChange(val: BigNumber, n: number, id: number) {
    const newSegment = { id, val };
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
    setSegmentMin(init.segmentMin);
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
                    min length: {segmentMin.toFixed(0)}, max length:{" "}
                    {segmentMax.toFixed(0)}
                  </Typography>
                </Grid>

                {evenSegments.map((segment, n) => (
                  <Fragment key={segment.id}>
                    <Grid item xs={8}>
                      <BigNumberInput
                        disabled={!multiplierIsLocked}
                        fullWidth
                        id={`even-segment-${segment.id}`}
                        label={`Segment ${n + 1}`}
                        max={segmentMax}
                        min={segmentMin}
                        name={`even-segment-${segment.id}`}
                        onChange={(val) => onSegmentChange(val, n, segment.id)}
                        value={segment.val}
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
                          !isNumber(val) ||
                          val.lt(segmentMin) ||
                          val.gt(segmentMax),
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
