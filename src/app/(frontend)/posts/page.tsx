import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 60

export default async function PostsPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 20,
    sort: '-createdAt',
    overrideAccess: false,
    depth: 0,
  })

  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">Crypto News</h1>
        <p className="mt-2 opacity-70">Najnoviji članci i analize.</p>
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
        <div className="mt-8 text-sm opacity-70">
          Stranica {posts.page ?? 1} / {posts.totalPages}
          {/* Pagination možemo dodati poslije */}
        </div>
      ) : null}
    </main>
  )
}
