import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import pg from 'pg'
import { neonConfig, Pool as NeonPool } from '@neondatabase/serverless'

neonConfig.fetchConnectionCache = true

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  admin: {
    user: 'users',
  },

  // collections ostaju iste kakve ima template
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'posts',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      slug: 'media',
      upload: {
        staticDir: path.join(__dirname, 'media'),
      },
      fields: [
        { name: 'alt', type: 'text' },
      ],
    },
  ],

  globals: [],

  sharp,

  // ✅ Neon Postgres konekcija
  db: new NeonPool({
    connectionString: process.env.DATABASE_URL,
  }) as unknown as pg.Pool,

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
