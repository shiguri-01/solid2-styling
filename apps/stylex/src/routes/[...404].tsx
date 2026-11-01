import { Title } from "@solidjs/meta";
import type { RouteDefinition } from "@solidjs/router";
import { httpStatus } from "@solidjs/web";
import { Card } from "../components/Card";
import { PageHeading } from "../components/PageHeading";

export const route = {
  preload: () => httpStatus(404),
} satisfies RouteDefinition;

export default function NotFound() {
  return (
    <>
      <Title>404 — Page Not Found</Title>
      <PageHeading
        title="404 — Page Not Found"
        description="The page you requested could not be found."
      />
      <Card>
        <a href="/issues">Back to issues →</a>
      </Card>
    </>
  );
}
