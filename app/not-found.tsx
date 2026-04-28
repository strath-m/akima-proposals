import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <Wordmark size="sm" />
        <p className="text-base text-text-muted">
          This proposal isn&rsquo;t here.
        </p>
        <Link
          href="https://akima.studio"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-ember"
        >
          akima.studio →
        </Link>
      </div>
    </main>
  );
}
