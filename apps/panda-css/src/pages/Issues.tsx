import { Board } from "../Board";
import type { IssueTrackerStore } from "utils";
export default function Issues(props: { tracker: IssueTrackerStore }) {
  return <Board library="Panda CSS" tracker={props.tracker} />;
}
