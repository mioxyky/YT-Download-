import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Accueil YT Download+">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-panel text-ytblue ring-1 ring-line">
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5 20h14v-2H5v2Zm7-18v10.17l3.59-3.58L17 10l-5 5-5-5 1.41-1.41L11 12.17V2h1Z" />
        </svg>
      </span>
      <span className="text-base font-bold tracking-tight text-ink sm:text-lg">
        YT Download<span className="text-ytblue">+</span>
      </span>
    </Link>
  );
}
