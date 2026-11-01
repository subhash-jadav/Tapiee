import Link from "next/link";
import { ErrorScreen } from "@/components/ErrorScreen";

export default function NotFound() {
  return (
    <ErrorScreen
      code="ERROR 404 · TAPE CHEWED"
      title="This mixtape got lost"
      message="The link might be mistyped, or the tape was deleted by the person who made it. Ask them to send the link again."
      actions={
        <>
          <Link href="/create" className="btn btn-primary">
            Make a mixtape →
          </Link>
          <Link href="/" className="btn btn-ghost">
            Go home
          </Link>
        </>
      }
    />
  );
}
