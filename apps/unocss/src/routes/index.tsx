import { createIssueTracker } from "utils";
import { Board } from "../Board";
export default function Home() {
  return <Board library="UnoCSS" tracker={createIssueTracker()} />;
}
