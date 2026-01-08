import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="text-lg font-extrabold">CryptoPortal</div>
          <p className="mt-2 max-w-prose text-sm opacity-75">
            Informativni kripto portal: vijesti, tržišta i trendovi. Nije financijski savjet.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold">Sections</div>
          <div className="mt-3 grid gap-2 text-sm opacity-80">
            <Link href="/posts" className="hover:opacity-100">
              News
            </Link>
            <Link href="/markets" className="hover:opacity-100">
              Markets
            </Link>
            <Link href="/search" className="hover:opacity-100">
              Search
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-bold">Links</div>
          <div className="mt-3 grid gap-2 text-sm opacity-80">
            <a
              className="hover:opacity-100"
              href="https://github.com/icyphotoget/cryptoportal"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <Link href="/privacy" className="hover:opacity-100">
              Privacy
            </Link>

            <Link href="/contact" className="hover:opacity-100">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} CryptoPortal. All rights reserved.</div>
          <div>Made by Marko • Not financial advice.</div>
        </div>
      </div>
    </footer>
  )
}
