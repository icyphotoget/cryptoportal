import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const revalidate = 3600

export async function GET() {
  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'posts',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
  })

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const urls = results.docs
    .map((doc: any) => {
      const slug = doc?.slug
      if (!slug) return null
      return `<url><loc>${baseUrl}/posts/${slug}</loc></url>`
    })
    .filter(Boolean)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
