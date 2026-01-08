import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

export default async function PostsPageNumber({
  params,
}: {
  params: Promise<{ pageNumber: string }>
}) {
  const { pageNumber } = await params
  const page = Number(pageNumber)

  if (!Number.isFinite(page) || page < 1) return notFound()

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 20,
    page,
    sort: '-createdAt',
    overrideAccess: false,
    depth: 0,
  })

  if (posts.totalPages > 0 && page > posts.totalPages) return notFound()

  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">Crypto News</h1>
        <p className="mt-2 opacity-70">
          Stranica {posts.page ?? page} / {posts.totalPages || 1}
        </p>
      </div>

      <div className="grid gap-4">
        {posts.docs.map((post: any) => (
          <article key={post.id} className="rounded-xl border border-white/10 p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>

            {post.excerpt ? <p className="mt-2 opacity-80">{post.excerpt}</p> : null}

            <div className="mt-3 text-sm opacity-60">
              {post.createdAt ? String(post.createdAt).split('T')[0] : ''}
            </div>
          </article>
        ))}
      </div>

      {posts.totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-between text-sm">
          <div className="opacity-70">
            Stranica {posts.page ?? page} / {posts.totalPages}
          </div>

          <div className="flex gap-4">
            {page > 1 ? (
              <Link className="hover:underline" href={page - 1 === 1 ? `/posts` : `/posts/page/${page - 1}`}>
                ← Previous
              </Link>
            ) : (
              <span className="opacity-30">← Previous</span>
            )}

            {posts.totalPages && page < posts.totalPages ? (
              <Link className="hover:underline" href={`/posts/page/${page + 1}`}>
                Next →
              </Link>
            ) : (
              <span className="opacity-30">Next →</span>
            )}
          </div>
        </div>
      ) : null}
    </main>
  )
}
