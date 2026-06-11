import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Accueil YT Download+">
      <span className="flex h-10 w-14 items-center justify-center rounded-xl bg-youtube shadow-sm">
        <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-white" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-ink">
        YT Download<span className="text-ytblue">+</span>
      </span>
    </Link>
  );
}
