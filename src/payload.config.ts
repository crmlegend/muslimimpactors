import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { existsSync } from 'node:fs'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { AIJobs } from './collections/AIJobs'
import { Articles } from './collections/Articles'
import { AuditLogs } from './collections/AuditLogs'
import { ContributorApplications } from './collections/ContributorApplications'
import { ExpertEssays } from './collections/ExpertEssays'
import { Occupations } from './collections/Occupations'
import { Pages } from './collections/Pages'
import { People } from './collections/People'
import { Places } from './collections/Places'
import { SocialAccounts } from './collections/SocialAccounts'
import { SocialPosts } from './collections/SocialPosts'
import { Sources } from './collections/Sources'
import { Sponsors } from './collections/Sponsors'
import { Stories } from './collections/Stories'
import { Tags } from './collections/Tags'
import { Topics } from './collections/Topics'
import { withAudit } from './collections/auditHooks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const databaseURL = process.env.DATABASE_URL || 'file:./payload.db'
const siteURL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '')
const allowedOrigins = [
  siteURL,
  'https://muslimimpactors.americanmotivations.com',
  'https://muslimimpactors-production.up.railway.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter((origin, index, origins) => Boolean(origin) && origins.indexOf(origin) === index)
const sqliteFilePath = databaseURL.startsWith('file:') ? databaseURL.replace(/^file:/, '') : ''
const sqliteDatabaseExists = sqliteFilePath ? existsSync(sqliteFilePath) : false
const shouldPushSQLiteSchema =
  process.env.PAYLOAD_SQLITE_PUSH === 'true' || !sqliteDatabaseExists
const shouldPushPostgresSchema = process.env.PAYLOAD_POSTGRES_PUSH === 'true'
const shouldUsePostgresSSL =
  process.env.DATABASE_SSL === 'true' || databaseURL.includes('supabase.com')
const dbAdapter = databaseURL.startsWith('postgres')
  ? postgresAdapter({
      pool: {
        connectionString: databaseURL,
        ...(shouldUsePostgresSSL
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {}),
      },
      push: shouldPushPostgresSchema,
    })
  : sqliteAdapter({
      client: {
        url: databaseURL,
      },
      push: shouldPushSQLiteSchema,
    })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: allowedOrigins,
  csrf: allowedOrigins,
  collections: [
    withAudit(Users, 'email'),
    withAudit(Media, 'filename'),
    withAudit(Sources, 'shortCitation'),
    withAudit(Sponsors, 'name'),
    withAudit(Topics, 'name'),
    withAudit(Tags, 'name'),
    withAudit(Occupations, 'name'),
    withAudit(Places, 'name'),
    withAudit(People, 'name'),
    withAudit(Stories, 'title'),
    withAudit(Articles, 'title'),
    withAudit(ExpertEssays, 'title'),
    withAudit(Pages, 'title'),
    withAudit(ContributorApplications, 'name'),
    withAudit(AIJobs, 'title'),
    withAudit(SocialAccounts, 'label'),
    withAudit(SocialPosts, 'title'),
    AuditLogs,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: siteURL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: dbAdapter,
  sharp,
  plugins: [],
})
