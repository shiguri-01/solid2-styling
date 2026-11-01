import { render, fireEvent, cleanup, waitFor, configure } from "@solidjs/testing-library";
import { afterEach, beforeEach, expect, test, vi } from "vite-plus/test";
import { flush } from "solid-js";
import App from "./App";

configure({ asyncUtilTimeout: 10000 });
vi.setConfig({ testTimeout: 20000 });

beforeEach(() => vi.spyOn(window, "scrollTo").mockImplementation(() => {}));
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

test("file routes navigate and preserve workspace settings", async () => {
  window.history.replaceState(null, "", "/settings");
  const view = render(() => <App />);
  const input = await view.findByDisplayValue("Solid / Design engineering");
  fireEvent.input(input, { target: { value: "Routing test workspace" } });
  flush();
  fireEvent.click(view.getByRole("button", { name: "Save changes" }));
  flush();
  fireEvent.click(view.getByRole("link", { name: "Projects" }));
  await waitFor(() => expect(window.location.pathname).toBe("/projects"));
  await view.findByText("Open issue board →");
  expect(view.getByText("Routing test workspace")).toBeInTheDocument();
  expect(view.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
});

test("unknown paths show a 404 with a link to the issues route", async () => {
  window.history.replaceState(null, "", "/missing/nested/page");
  const view = render(() => <App />);
  expect(await view.findByRole("heading", { name: "404 — Page Not Found" })).toBeInTheDocument();
  expect(view.getByRole("link", { name: "Back to issues →" })).toHaveAttribute("href", "/issues");
});

test("the root redirects to issues", async () => {
  window.history.replaceState(null, "", "/");
  const view = render(() => <App />);
  await view.findByRole("heading", { name: "Solid 2.0 × Lism CSS" }, { timeout: 10000 });
  expect(window.location.pathname).toBe("/issues");
});
