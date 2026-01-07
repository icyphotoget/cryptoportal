import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 60

export default async function HomePage() {
  const base = getServerSideURL()
  const res = await fetch(`${base}/api/posts?limit=5`, { next: { revalidate: 60 } })
  const data = res.ok ? await res.json() : { docs: [] }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-extrabold">Crypto Info Portal</h1>
      <p className="mb-6 opacity-70">Najnovije vijesti iz svijeta kripta i memecoina</p>

      <h2 className="mb-4 text-xl font-bold">Latest News</h2>

      <div className="grid gap-4">
        {data.docs.map((p: any) => (
          <a
            key={p.id}
            href={`/posts/${p.slug}`}
            className="block rounded-2xl border border-border p-4 transition hover:opacity-95"
          >
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="text-sm opacity-60">{String(p.createdAt).split('T')[0]}</div>
          </a>
        ))}
      </div>
    </main>
  )
}
