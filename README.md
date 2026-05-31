# Muslim Impactors

Working-title prototype for a research-based public archive of Muslim public service, humanitarian contribution, civic life, scholarship, culture, sources, expert essays, media, and story-led historical context.

The app is scaffolded with Next.js and Payload CMS. Local development defaults to SQLite so the admin workspace can run immediately without Docker; Postgres remains supported by changing `DATABASE_URL`. Public visitors can register interest, submit contributor applications, and ask the local archive assistant, while internal users manage public personalities, stories, wiki-style articles, sources, sponsors, media rights, expert essays, page-builder pages, AI jobs, LinkedIn/X social-post drafts, and controlled super-admin CMS commands.

Preferred launch subdomain: `https://muslimimpactors.americanmotivations.com`.

## Local Setup

1. Start the app:

```bash
npm run dev
```

2. Open:

- Public site: `http://localhost:3000`
- CMS admin: `http://localhost:3000/admin`

On the first admin visit, Payload will ask you to create the first user. Give that user the `Super Admin` role after creation.

## Current Architecture

- Framework: Next.js App Router.
- CMS: Payload CMS.
- Database: SQLite locally, Postgres/Supabase-ready through `@payloadcms/db-postgres`.
- Optional local Postgres: `pgvector/pgvector:pg16` Docker image is configured for machines with Docker.
- Public launch model: read-first MVP with contributor signup and reviewed submissions.
- Public homepage: Muslim impact archive with an American Muslim launch dataset by default.
- Search UX: interactive top search preview with grouped results.
- Public routes: `/stories`, `/stories/[slug]`, `/articles`, `/articles/[slug]`, `/personalities`, `/personalities/[slug]`, `/muslims-in-history`, `/contributors`, `/sponsors`, `/themes`, `/timelines`, `/sources`, `/blog`, `/ask`, `/search`, and `/workflow`.
- Public people routes read published Payload records first, then fall back to static seed data when CMS data is unavailable.
- Super-admin operations: `/admin-ai` previews and executes whitelisted CMS changes such as bulk archive-track edits, external video updates, draft sponsor creation, and draft source creation.
- Internal social publishing: LinkedIn and X draft/schedule records.
- Expert essay workflow: editor uploads Word/PDF, edits draft, checks Expert Approved, previews supported public routes, then rights and publisher gates apply.

## Useful Commands

```bash
npm run db:up
npm run db:down
npm run dev
npm run lint
npm run generate:types
npm run build
```

## Important Environment Variables

```bash
DATABASE_URL=file:./payload.db
PAYLOAD_SECRET=replace-with-a-long-secret
NEXT_PUBLIC_SITE_URL=https://muslimimpactors.americanmotivations.com
```

For the first Supabase-backed production launch, set:

```bash
DATABASE_URL=postgres://...
PAYLOAD_SECRET=replace-with-a-long-secret
NEXT_PUBLIC_SITE_URL=https://muslimimpactors.americanmotivations.com
PAYLOAD_POSTGRES_PUSH=false
```

Temporarily set `PAYLOAD_POSTGRES_PUSH=true` only while creating the initial production schema, then set it back to `false` before leaving the service online.

## Launch-Day Deployment

Recommended MVP path: deploy the Next.js/Payload app to Render or Railway and use Supabase for Postgres.

Build command:

```bash
npm ci && npm run build
```

Start command:

```bash
npm run start -- -H 0.0.0.0 -p $PORT
```

After the service deploys, run the archive seed once from the host shell:

```bash
npm run seed:archive
```

Do not expose seed or diagnostic routes in production. Use the host shell or a one-off job for seed operations.

Then add `muslimimpactors.americanmotivations.com` as the custom domain and create the DNS record requested by the host.

## Implemented Collections

- Users
- Media
- Sources
- Topics
- Tags
- Occupations
- Places
- Public Personalities
- Stories
- Articles
- Expert Essays
- Pages
- AI Jobs
- Contributor Applications
- Sponsors
- Social Accounts
- Social Posts

## How To Test The Prototype

1. Visit `http://localhost:3000`.
2. Type `Ali`, `American`, `service`, or `medicine` into the top search box and confirm the mega menu groups results by personality, theme, story, source, article, essay, blog, and contributor.
3. Use the top menu to open `Personalities`, `Muslims in History`, `Themes`, `Timelines`, `Blog`, `AI Ask`, and `Help`. Use the footer for `Stories`, `Articles`, contributors, sponsors, sources, and submission process pages.
4. On the homepage, hover the portrait grid, click `Open transcript`, and click `Save to research list`.
5. Open `/ask`, ask a free-form question, and confirm the assistant returns cited archive records with a five-question browser limit.
6. Open `/workflow`, submit the contributor signup form, and confirm the application appears in the admin Contributor Applications collection.
7. Click `Admin`, create or sign in as a Super Admin, then create test records in Public Personalities, Sources, Sponsors, Media, Stories, Articles, and Expert Essays.
8. In Expert Essays, use the editor upload/draft fields to attach a Word/PDF submission, paste or extract text into the editable draft, and check `Expert Approved` when the expert-approved version is ready.
9. Use the Preview button on People, Stories, Articles, Pages, and Expert Essays to inspect the public route before publishing.
10. Open `/admin-ai` as a Super Admin, preview a safe command, and execute only after the operation list is correct.
11. Try publishing as a non-publisher role and then as a Publisher/Admin role to verify the approval gate behavior.

## Next Build Steps

- Continue the Payload-backed public cutover beyond People into stories, articles, homepage data, and search.
- Connect the search mega menu to Payload data across all published records.
- Add media watermark background job.
- Add document extraction for expert essay uploads.
- Add pgvector embedding table and AI Q&A route.
- Add real LinkedIn/X OAuth and posting provider.
