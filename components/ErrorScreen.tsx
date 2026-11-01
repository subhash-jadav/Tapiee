import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SiteFooter } from "./SiteFooter";

/** Shared layout for the 404 and crash pages: site header, a cassette with its tape spilling out, message, actions. */
export function ErrorScreen({ code, title, message, actions, detail }: { code: string; title: string; message: string; actions: ReactNode; detail?: string }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-2xl">
          Tapiee<span className="text-orange">.</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto grid w-full max-w-xl flex-1 place-items-center px-6 py-10 text-center">
        <div className="pop-in">
          <SpilledTape />
          <p className="mb-2 mt-8 font-type text-sm tracking-widest text-orange">{code}</p>
          <h1 className="mb-3 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mx-auto mb-7 max-w-md text-ink/70">{message}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
          {detail && <p className="mt-6 font-type text-xs text-ink/40">{detail}</p>}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/** A small cassette with a loop of tape pulled out of it. */
function SpilledTape() {
  return (
    <svg viewBox="0 0 220 150" className="mx-auto w-52 drop-shadow-[0_10px_20px_rgba(0,0,0,.25)]" aria-hidden>
      <g transform="rotate(-6 110 70)">
        <rect x="20" y="18" width="180" height="112" rx="12" fill="var(--color-ink)" />
        <rect x="34" y="30" width="152" height="60" rx="6" fill="var(--color-paper)" />
        <rect x="34" y="66" width="152" height="8" fill="var(--color-mustard)" />
        <rect x="34" y="74" width="152" height="7" fill="var(--color-orange)" />
        <rect x="70" y="42" width="80" height="26" rx="13" fill="var(--color-ink)" />
        <circle cx="86" cy="55" r="8" fill="var(--color-paper)" />
        <circle cx="134" cy="55" r="8" fill="var(--color-paper)" />
        <path d="M60 130 L72 104 L148 104 L160 130 Z" fill="var(--color-paper)" opacity=".12" />
      </g>
      {/* the chewed tape */}
      <path
        d="M98 124 C 92 140, 70 138, 66 128 C 60 112, 88 110, 84 126 C 80 142, 112 146, 120 132 C 128 118, 150 124, 146 138 C 142 148, 168 146, 176 136"
        fill="none"
        stroke="var(--color-brown)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
