import { bignumber as big } from "mathjs";
import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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

  function cancelEdit() {
    setValue(multiplier);
    onLockUpdate(true);
  }

  function updateMultiplier(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onUpdate(value, segmentMin);
    onLockUpdate(true);
  }

  // add Form JSX, with cancel option when evenSegments.length > 1
  return (
    <Grid
      component="form"
      container
      onSubmit={isLocked ? unlockMultiplier : updateMultiplier}
      spacing={1}
    >
      <Grid item xs={8}>
        <TextField
          autoFocus
          disabled={isLocked}
          fullWidth={true}
          helperText={
            <>
              {!isLocked && isEven && (
                <Box color="warning.main" component="span">
                  With this multiplier, every segment will need to have at least{" "}
                  <strong>{segmentMin}</strong> even number
                  {segmentMin > 1 ? "s" : ""}.<br />
                </Box>
              )}
              {!isLocked &&
                isEven &&
                evenSegments.some(({ val }) => val < segmentMin) && (
                  <Box color="error.main" component="span">
                    This will update your current segments.
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
      {evenSegments.length === 0 && (
        <Grid item xs={4} textAlign="left">
          <Button
            disabled={Number.isNaN(value) || value === 0}
            size="large"
            sx={{ height: (th) => th.spacing(7) }}
            type="submit"
            variant="contained"
          >
            Next
          </Button>
        </Grid>
      )}
      {evenSegments.length > 0 && (
        <Grid item xs={4} textAlign="left">
          {isLocked && (
            <IconButton
              aria-label="edit multiplier"
              size="large"
              sx={{ height: (th) => th.spacing(7) }}
              type="submit"
            >
              <ModeEditIcon />
            </IconButton>
          )}
          {!isLocked && (
            <>
              <Button
                sx={{ height: (th) => th.spacing(7) }}
                type="submit"
                variant="contained"
              >
                Update
              </Button>
              <Button
                color="error"
                onClick={cancelEdit}
                sx={{ height: (th) => th.spacing(7) }}
                variant="text"
              >
                Cancel
              </Button>
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
}
