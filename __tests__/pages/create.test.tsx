import { afterEach, describe, expect, test, vi } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { render, cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import theme from "@/lib/theme";
import Create from "@/pages/create";

// see https://github.com/vercel/next.js/issues/59701
vi.mock("next/font/google", () => ({
  Roboto: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("Create", () => {
  afterEach(cleanup);

  test("generates a Collatz Loop given valid user input", async () => {
    const multiplier = 5;
    const evenSegments = [3, 2];
    const expectedDenominator = 7;
    const expectedNumerator = 13;
    const expectedLoop = [13, 72, 36, 18, 9, 52, 26, 13];

    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <Create />
      </ThemeProvider>,
    );

    const multiplierInput = screen.getByRole("spinbutton", {
      name: /multiplier/i,
    });
    await user.clear(multiplierInput);
    await user.type(multiplierInput, multiplier.toString());
    await user.click(screen.getByRole("button", { name: /next/i }));

    let idx = -1;
    for (const evenSegment of evenSegments) {
      idx++;
      const segmentInputs = await screen.findAllByRole("spinbutton", {
        name: /segment/i,
      });
      expect(segmentInputs).toHaveLength(idx + 1);

      const segmentInput = segmentInputs[idx];
      await user.clear(segmentInput);
      await user.type(segmentInput, evenSegment.toString());
      if (idx < evenSegments.length - 1) {
        await user.click(screen.getByRole("button", { name: /add segment/i }));
      }
    }

    await user.click(screen.getByRole("button", { name: /finish loop/i }));

    const resultBox = screen.getByLabelText(/result/i);
    expect(resultBox).toHaveTextContent(
      `for odd numbers, calculate ${multiplier}x + ${expectedDenominator}`,
    );
    expect(resultBox).toHaveTextContent(
      `starts at the number ${expectedNumerator}.`,
    );
    expect(resultBox).toHaveTextContent(expectedLoop.join(""));
  });
});
