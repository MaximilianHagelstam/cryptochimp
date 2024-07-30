import { expect, test } from "vitest";
import { formatPercentage } from "../src/lib/utils";

test("percentage formatting 0 should be 0%", () => {
  expect(formatPercentage(0));
});
