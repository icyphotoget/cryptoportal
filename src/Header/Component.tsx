import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border">
            ₿
          </span>
          <span className="text-lg">CryptoPortal</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/posts" className="opacity-80 hover:opacity-100">
            News
          </Link>
          <Link href="/markets" className="opacity-80 hover:opacity-100">
            Markets
          </Link>
          <Link href="/search" className="opacity-80 hover:opacity-100">
            Search
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold opacity-90 hover:opacity-100"
          >
            Search
          </Link>

          <Link
            href="/subscribe"
            className="rounded-xl bg-foreground px-3 py-2 text-sm font-semibold text-background hover:opacity-90"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  )
}
