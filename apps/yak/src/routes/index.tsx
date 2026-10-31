import { createIssueTracker } from "utils";
import { Board } from "../Board";
export default function Home() {
  const tracker = createIssueTracker();
  return <Board library="yak" tracker={tracker} />;
}
