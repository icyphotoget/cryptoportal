import Link from 'next/link'
import Image from 'next/image'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 60

type PayloadMedia = {
  url?: string
  filename?: string
  alt?: string
}

function pickPostImage(post: any): PayloadMedia | null {
  // Probaj najčešća mjesta gdje template sprema sliku
  const candidates = [
    post?.heroImage,
    post?.featuredImage,
    post?.image,
    post?.meta?.image,
    post?.hero?.image,
  ]

  for (const c of candidates) {
    if (!c) continue
    // relationship može biti id ili cijeli object; nama treba object s url
    if (typeof c === 'object' && (c.url || c.filename)) return c as PayloadMedia
  }
  return null
}

function getMediaSrc(media: PayloadMedia | null): string | null {
  if (!media) return null
  // Payload često vraća url tipa "/media/xxx.jpg"
  if (media.url) return media.url
  if (media.filename) return `/media/${media.filename}`
  return null
}

function formatDate(iso?: string) {
  if (!iso) return ''
  return iso.split('T')[0]
}

export default async function HomePage() {
  const base = getServerSideURL()

  // depth=2 pomaže da relationship (slika) dođe kao object, ne samo ID
  const res = await fetch(`${base}/api/posts?limit=12&sort=-createdAt&depth=2`, {
    next: { revalidate: 60 },
  })

  const data = res.ok ? await res.json() : { docs: [] }
  const posts: any[] = data?.docs ?? []

  const [top, ...rest] = posts

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      {/* HERO */}
      <section className="grid gap-6 md:grid-cols-2 md:items-stretch">
        <div className="rounded-3xl border border-border p-6 md:p-8">
          <p className="mb-3 inline-flex items-center rounded-full border border-border px-3 py-1 text-xs opacity-80">
            LIVE • Crypto News & Markets
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
            Crypto Info Portal
          </h1>
          <p className="mt-3 max-w-prose text-sm opacity-75 md:text-base">
            Najnovije vijesti, tržišni pregled i memecoin trendovi — brzo, čisto i bez walleta.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:opacity-90"
            >
              Čitaj vijesti
            </Link>
            <Link
              href="/markets"
              className="rounded-xl bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90"
            >
              Pogledaj markete
            </Link>
          </div>
        </div>

        {/* Top story */}
        <div className="overflow-hidden rounded-3xl border border-border">
          {top ? (
            <TopStoryCard post={top} />
          ) : (
            <div className="p-6 opacity-70">Nema objava još. Dodaj postove u /admin → Posts.</div>
          )}
        </div>
      </section>

      {/* Latest */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold md:text-2xl">Latest News</h2>
          <Link href="/posts" className="text-sm opacity-75 hover:opacity-100">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </section>
    </main>
  )
}

function TopStoryCard({ post }: { post: any }) {
  const img = pickPostImage(post)
  const src = getMediaSrc(img)
  const title = post?.title ?? 'Untitled'
  const slug = post?.slug ?? ''
  const date = formatDate(post?.createdAt)

  return (
    <Link href={`/posts/${slug}`} className="group block h-full">
      <div className="relative h-64 w-full md:h-full">
        {src ? (
          <Image
            src={src}
            alt={img?.alt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/40 text-sm opacity-70">
            Nema slike (dodaj featured/hero image u postu)
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-2 text-xs text-white/80">{date}</div>
          <div className="text-xl font-extrabold text-white md:text-2xl">{title}</div>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: any }) {
  const img = pickPostImage(post)
  const src = getMediaSrc(img)
  const title = post?.title ?? 'Untitled'
  const slug = post?.slug ?? ''
  const date = formatDate(post?.createdAt)

  return (
    <Link
      href={`/posts/${slug}`}
      className="group overflow-hidden rounded-2xl border border-border hover:opacity-95"
    >
      <div className="relative h-44 w-full bg-muted/40">
        {src ? (
          <Image
            src={src}
            alt={img?.alt || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs opacity-70">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs opacity-60">{date}</div>
        <div className="mt-1 line-clamp-2 text-base font-semibold">{title}</div>
      </div>
    </Link>
  )
}
