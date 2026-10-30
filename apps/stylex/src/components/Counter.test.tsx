import { render, fireEvent } from "@solidjs/testing-library";
import { captureArtifact, expectNoDiagnostics, expectRerunBudget } from "@solidjs/diagnostics";
import { flush } from "solid-js";
import { describe, expect, test } from "vite-plus/test";

import Counter from "./Counter";

describe("<Counter />", () => {
  test("it increments on click and switches StyleX classes", () => {
    const view = render(() => <Counter />);
    const button = view.getByRole("button");
    const initialClass = button.className;
    expect(button).toHaveTextContent("Clicks: 0");
    expect(initialClass).toBeTruthy();

    fireEvent.click(button);
    flush();
    expect(button).toHaveTextContent("Clicks: 1");
    expect(button.className).not.toBe(initialClass);
  });

  test("a click re-runs text and class scopes and trips no diagnostic", async () => {
    const { artifact } = await captureArtifact(
      () => {
        const view = render(() => <Counter />);
        const button = view.getByRole("button");
        fireEvent.click(button);
        flush();
        expect(button).toHaveTextContent("Clicks: 1");
      },
      { scenario: "counter-click" },
    );
    expectNoDiagnostics(artifact);
    // 1 for button text binding + 1 for dynamic StyleX class binding
    expectRerunBudget(artifact, 2);
  });
});
