import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'password', type: 'password', required: true },
      ],
    },
    {
      slug: 'posts',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
        {
          name: 'meta',
          type: 'group',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      slug: 'markets',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'symbol', type: 'text', required: true },
      ],
    },
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  typescript: {
    outputFile: 'src/payload-types.ts',
  },
})
