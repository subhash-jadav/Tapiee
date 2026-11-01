"use client"; // Error boundaries must be Client Components

// Last resort when the root layout itself fails. It replaces the whole document, so it carries its
// own minimal styles (the site's CSS, fonts and theme don't reach it) and follows the OS light/dark mode.
const CSS = `
  :root { --bg: #f4ead5; --ink: #2b2118; --muted: #6b5d50; --orange: #e8742c; color-scheme: light dark; }
  @media (prefers-color-scheme: dark) { :root { --bg: #15110e; --ink: #efe6d8; --muted: #b8a994; --orange: #ec8a4b; } }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100dvh; display: grid; place-items: center; padding: 24px; text-align: center;
    background: var(--bg); color: var(--ink); font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
  .logo { font: italic 800 28px Georgia, serif; margin: 0 0 28px; }
  .logo span { color: var(--orange); }
  .code { color: var(--orange); font: 13px ui-monospace, Consolas, monospace; letter-spacing: .18em; margin: 0 0 8px; }
  h1 { font: italic 800 34px/1.15 Georgia, serif; margin: 0 0 12px; }
  p.msg { color: var(--muted); max-width: 420px; margin: 0 auto 26px; line-height: 1.5; }
  .row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn { font: 600 16px system-ui, sans-serif; padding: 12px 22px; border-radius: 999px; border: 2px solid var(--ink);
    background: transparent; color: var(--ink); cursor: pointer; text-decoration: none; }
  .btn.primary { background: var(--orange); color: #1a120c; border-color: #1a120c; }
`;

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body>
        <title>Something went wrong · Tapiee</title>
        <style>{CSS}</style>
        <main>
          <p className="logo">
            Tapiee<span>.</span>
          </p>
          <p className="code">ERROR · TAPE JAMMED</p>
          <h1>Oops, the tape got stuck</h1>
          <p className="msg">Something went wrong on our side. Your saved tapes are safe. Try again in a moment.</p>
          <div className="row">
            <button type="button" className="btn primary" onClick={() => retry()}>
              ↻ Try again
            </button>
            {/* A full page load, since the app shell itself failed. */}
            <a href="/" className="btn">
              Go home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
