import { captureArtifact, expectNoDiagnostics, expectRerunBudget } from "@solidjs/diagnostics";
import { render, fireEvent } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { describe, expect, test } from "vite-plus/test";
import Counter from "./Counter";

describe("<Counter />", () => {
  test("it increments and updates Yak's reactive styled prop", () => {
    const view = render(() => <Counter />);
    const button = view.getByRole("button");
    expect(button).toHaveTextContent("Clicks: 0");
    expect(button).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(button);
    flush();
    expect(button).toHaveTextContent("Clicks: 1");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
  test("a click updates text and styled props without diagnostics", async () => {
    const { artifact } = await captureArtifact(
      () => {
        const view = render(() => <Counter />);
        fireEvent.click(view.getByRole("button"));
        flush();
      },
      { scenario: "counter-click" },
    );
    expectNoDiagnostics(artifact);
    // Yak's reactive styled prop currently traverses two computed/effect pairs.
    expectRerunBudget(artifact, 4);
  });
});
