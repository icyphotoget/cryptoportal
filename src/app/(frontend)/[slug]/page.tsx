import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function PostBySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  const post = results?.docs?.[0]
  if (!post) return notFound()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-4xl font-extrabold">{post.title}</h1>
      <div className="mt-3 text-sm opacity-60">
        {post?.createdAt ? String(post.createdAt).split('T')[0] : ''}
      </div>

      <article className="prose prose-invert mt-8 max-w-none">
        {/* ako ti je content text/textarea */}
        {post.content ? <p>{post.content}</p> : null}
      </article>
    </main>
  )
}
