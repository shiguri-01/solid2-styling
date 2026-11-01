import { captureArtifact, expectNoDiagnostics, expectRerunBudget } from "@solidjs/diagnostics";
import { render, fireEvent } from "@solidjs/testing-library";
import { flush } from "solid-js";
import { describe, expect, test } from "vite-plus/test";
import Counter from "./Counter";

describe("<Counter />", () => {
  test("it increments and switches its Panda recipe class", () => {
    const view = render(() => <Counter />);
    const button = view.getByRole("button");
    const initialClass = button.className;
    expect(button).toHaveTextContent("Clicks: 0");
    fireEvent.click(button);
    flush();
    expect(button).toHaveTextContent("Clicks: 1");
    expect(button.className).not.toBe(initialClass);
  });
  test("a click updates text and recipe class without diagnostics", async () => {
    const { artifact } = await captureArtifact(
      () => {
        const view = render(() => <Counter />);
        fireEvent.click(view.getByRole("button"));
        flush();
      },
      { scenario: "counter-click" },
    );
    expectNoDiagnostics(artifact);
    expectRerunBudget(artifact, 2);
  });
});
