"use client"; // Error boundaries must be Client Components
import { useEffect } from "react";
import { ErrorScreen } from "@/components/ErrorScreen";

/** Shown when a page crashes. `retry` re-fetches and re-renders the broken part. */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  // Server errors carry a digest that matches the entry in Vercel's logs.
  const digest = error instanceof Error && "digest" in error ? String((error as Error & { digest?: string }).digest ?? "") : "";

  return (
    <ErrorScreen
      code="ERROR · TAPE JAMMED"
      title="Oops, the tape got stuck"
      message="Something went wrong on our side. Your saved tapes are safe. Try again in a moment."
      detail={digest ? `ref ${digest}` : undefined}
      actions={
        <>
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            ↻ Try again
          </button>
          <a href="/" className="btn btn-ghost">
            Go home
          </a>
        </>
      }
    />
  );
}
