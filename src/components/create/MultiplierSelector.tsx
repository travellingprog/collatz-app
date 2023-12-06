import { bignumber as big } from "mathjs";
import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import type { EvenSegment } from "@/lib/types";

type Props = {
  evenSegments: EvenSegment[];
  isLocked: boolean;
  multiplier: number;
  onLockUpdate: (isLocked: boolean) => void;
  onUpdate: (multiplier: number, segmentMin: number) => void;
};

/**
 * A form in charge of selecting and updating the multiplier,
 * with appropriate warnings for certain situations.
 */
export default function MultiplierSelector(props: Props) {
  const { evenSegments, isLocked, multiplier, onLockUpdate, onUpdate } = props;

  const [value, setValue] = useState(multiplier);
  useEffect(() => setValue(multiplier), [multiplier]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isLocked) {
      inputRef.current?.focus();
    }
  }, [isLocked]);

  const isEven = useMemo(() => {
    if (Number.isNaN(value)) {
      // value is blank
      return false;
    }

    return big(value || 0)
      .mod(2)
      .equals(0);
  }, [value]);

  // if the value is even, calculate the required minimum length
  // of every "even numbers" segment in the loop
  const segmentMin = useMemo(() => {
    let min = 1;
    const bigValue = big(value || 0);
    if (isEven && !bigValue.isZero()) {
      while (bigValue.mod(big(2).pow(min)).equals(0)) {
        min++;
      }
    }

    return min;
  }, [value, isEven]);

  function unlockMultiplier(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLockUpdate(false);
  }

  function updateMultiplier(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("form submitted");
    onUpdate(value, segmentMin);
    onLockUpdate(true);
  }

  // add Form JSX, with cancel option when evenSegments.length > 1
  return (
    <Grid
      component="form"
      container
      onSubmit={isLocked ? unlockMultiplier : updateMultiplier}
      mt={8}
      spacing={1}
    >
      <Grid item xs={1} />
      <Grid item xs={8}>
        <TextField
          disabled={isLocked}
          fullWidth
          helperText={
            <>
              {!isLocked && isEven && (
                <Box color="warning.main">
                  When the multiplier is even, then each segment in the loop
                  needs a minimum amount of even numbers. <br />
                  For your chosen multiplier, every segment will need to have at
                  least <strong>{segmentMin}</strong> even number
                  {segmentMin > 1 ? "s" : ""}.
                </Box>
              )}
              {!isLocked &&
                isEven &&
                evenSegments.some(({ val }) => val < segmentMin) && (
                  <Box color="error.main">
                    Setting this multiplier will automatically increase some of
                    your segments to a value of {segmentMin}.
                  </Box>
                )}
            </>
          }
          id="multiplier"
          inputRef={inputRef}
          label={isLocked ? "Multiplier" : "Choose Your Multiplier"}
          name="multiplier"
          onChange={(e) => setValue(Number.parseInt(e.target.value))}
          type="number"
          value={Number.isNaN(value) ? "" : value}
        />
      </Grid>
      <Grid item xs={2} textAlign="right">
        {isLocked ? (
          <Button
            size="large"
            sx={{ height: (th) => th.spacing(7) }}
            type="submit"
            variant="text"
          >
            Update
          </Button>
        ) : (
          <Button
            disabled={Number.isNaN(value) || value === 0}
            size="large"
            sx={{ height: (th) => th.spacing(7) }}
            type="submit"
            variant="contained"
          >
            Set Multiplier
          </Button>
        )}
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
