import { useEffect, useMemo, useRef, useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import BigNumberInput from "@/components/common/BigNumberInput";
import { BigNumber, isEven as isEvenFn, isNumber } from "@/lib/math";
import { Loop } from "@/lib/collatzLoop";

import type { EvenSegment } from "@/lib/types";

type Props = {
  evenSegments: EvenSegment[];
  isLocked: boolean;
  multiplier: BigNumber;
  onLockUpdate: (isLocked: boolean) => void;
  onUpdate: (multiplier: BigNumber, segmentMin: BigNumber) => void;
};

/**
 * A form in charge of selecting and updating the multiplier,
 * with appropriate warnings for certain situations.
 */
export default function MultiplierSelector(props: Props) {
  const { evenSegments, isLocked, multiplier, onLockUpdate, onUpdate } = props;

  const [draftValue, setDraftValue] = useState(multiplier);
  useEffect(() => setDraftValue(multiplier), [multiplier]);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isLocked) {
      inputRef.current?.focus();
    }
  }, [isLocked]);

  const isEven = useMemo(() => {
    return isNumber(draftValue) ? isEvenFn(draftValue) : false;
  }, [draftValue]);

  // calculate the required minimum length
  // of every "even numbers" segment in the loop
  const segmentMin = useMemo(() => {
    return Loop.calcSegmentMin(draftValue);
  }, [draftValue]);

  const isSubmitDisabled = !isNumber(draftValue) || draftValue.isZero();

  function unlockMultiplier(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLockUpdate(false);
  }

  function cancelEdit() {
    setDraftValue(multiplier);
    onLockUpdate(true);
  }

  function updateMultiplier(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onUpdate(draftValue, segmentMin);
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
        <BigNumberInput
          autoFocus
          disabled={isLocked}
          fullWidth={true}
          helperText={
            <>
              {!isLocked && isEven && (
                <Box color="warning.main" component="span">
                  With this multiplier, every segment will need to have at least{" "}
                  <strong>{segmentMin.toFixed(0)}</strong> even number
                  {segmentMin.gt(1) ? "s" : ""}.<br />
                </Box>
              )}
              {!isLocked &&
                isEven &&
                evenSegments.some(({ val }) => val.lt(segmentMin)) && (
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
          onChange={setDraftValue}
          value={draftValue}
        />
      </Grid>
      {evenSegments.length === 0 && (
        <Grid item xs={4} textAlign="left">
          <Button
            disabled={isSubmitDisabled}
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
                disabled={isSubmitDisabled}
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
