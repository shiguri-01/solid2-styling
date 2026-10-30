import { createIssueTracker } from "utils";
import { Board } from "../Board";
export default function Home() {
  return <Board library="Panda CSS" tracker={createIssueTracker()} />;
}
