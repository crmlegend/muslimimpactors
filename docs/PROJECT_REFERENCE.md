# Muslim Impactors Project Reference

Last updated: 2026-07-13

This document is the technical and editorial reference for Muslim Impactors. It explains what was built, how the public website and CMS connect, why the main database fields exist, how the content workflow works, and what a future developer must know before changing the system.

## 1. Product Summary

Muslim Impactors is a public research archive and contributor network focused on Muslim public service, civic impact, scholarship, culture, humanitarian contribution, and historical intellectual context in the United States.

The current MVP is designed for reviewer and sponsor demonstration. It intentionally combines:

- A Web of Stories inspired public homepage with a portrait wall, hover preview, and video popup behavior.
- A public archive of people, stories, articles, topics, sponsors, sources, and historical context.
- A Payload CMS admin for internal editors, publishers, rights reviewers, and super admins.
- Supabase Postgres as the live production database.
- Railway as the live application host for the review demo.
- GitHub as the deployment source of truth.

The public content is currently seeded with demo/reference records. The seeded content is not intended as final publication copy. Editors should replace demo media, summaries, source notes, and sponsor text with approved/licensed material before a public launch.

## 2. Current Stack

### Application

- Framework: Next.js App Router
- Language: TypeScript
- CMS: Payload CMS 3
- Rich text editor: Payload Lexical editor
- Public frontend: Next.js React components and CSS modules/global CSS
- Admin frontend: Payload admin
- Image processing: Sharp

### Database

- Production database: Supabase Postgres
- Local development database: SQLite by default, with optional Postgres through Docker
- Payload database adapters:
  - `@payloadcms/db-postgres` for production
  - `@payloadcms/db-sqlite` for local

### Hosting

- Production/review host: Railway
- Live custom domain: `https://muslimimpactors.americanmotivations.com`
- Railway fallback URL: `https://muslimimpactors-production.up.railway.app`
- Repository: `crmlegend/muslimimpactors`

### Why This Stack Was Used

Payload was selected because the project needs a flexible internal CMS with relationship fields, review workflow, media metadata, source tracking, and admin permissions. Next.js was kept because the public experience needs richer interactive UI than a simple server-rendered site. Supabase Postgres provides managed Postgres quickly without operating infrastructure. Railway was selected because it is fast enough for a review demo and simpler than EC2 for this stage.

## 3. Repository Structure

Important paths:

- `src/payload.config.ts`: Payload CMS configuration, database adapter, collections, globals, admin setup, CORS/CSRF origins.
- `src/collections/`: Payload collection definitions.
- `src/globals/SiteSettings.ts`: Global homepage and branding controls.
- `src/app/(frontend)/`: Public Next.js routes and public frontend components.
- `src/app/(frontend)/admin-ai/`: Super-admin command center for controlled CMS operations.
- `src/app/(frontend)/api/admin-ai/route.ts`: Preview/execute API for whitelisted admin CMS commands.
- `src/app/(payload)/`: Payload API and admin routes.
- `src/scripts/seedArchive.ts`: Demo/archive seed script.
- `src/migrations/`: Postgres migrations used by production startup through Payload `prodMigrations`.
- `src/app/favicon.ico/route.ts`: Shared Muslim Impactors favicon route for public and admin surfaces.
- Temporary public seed/diagnostic routes were removed after production stabilization:
  - `/archive-bootstrap`
  - `/admin-diagnostics`
  - `/payload-diagnostics`
- `public/`: Public static assets, including sponsor placeholder/banner assets.
- `Dockerfile`: Railway production image build.
- `railway.json`: Railway deployment configuration.
- `README.md`: Setup and deployment summary.

## 4. Runtime Environments

### Local

Local development uses SQLite unless `DATABASE_URL` points to Postgres.

Common local command:

```bash
npm run dev
```

The current `dev` script sets `PAYLOAD_SQLITE_PUSH=true` so Payload can update the local SQLite schema while the data model is still changing.

Local SQLite drift note:

- The committed production migration for `archiveTrack` targets Postgres.
- Local development uses the ignored `payload.db` SQLite file, so an older local database can drift from the current Payload schema.
- If local admin routes fail with `SQLITE_ERROR: no such column: archive_track`, add the local SQLite column and backfill it, or reseed a fresh local database if no local data needs to be preserved.
- This local SQLite recovery is not a production deployment step.

### Production

Production uses Supabase Postgres through `DATABASE_URL`.

Important production env vars:

- `DATABASE_URL`: Supabase Postgres connection string. Must be a Postgres URI, not the Supabase project API URL.
- `DATABASE_SSL`: Set to `true` for Supabase if SSL is required.
- `PAYLOAD_SECRET`: Payload encryption/session secret. Must never be committed.
- `NEXT_PUBLIC_SITE_URL`: Public canonical URL, currently `https://muslimimpactors.americanmotivations.com`.
- `PAYLOAD_POSTGRES_PUSH`: Keep `false` in stable production. Use migrations for schema changes.
- `PAYLOAD_SQLITE_PUSH`: Local SQLite schema push flag.
- `NODE_ENV`: `production` on Railway.

Railway build-stage note:

- Railway can run the Docker image build without runtime environment variables available to `next build`.
- Next.js imports Payload config while collecting page data for routes such as `/api/visitor-event`.
- `src/payload.config.ts` therefore allows a build-only placeholder secret when `NEXT_PHASE=phase-production-build`.
- The running production server still requires a real `PAYLOAD_SECRET`; missing it outside the Next production build phase throws `PAYLOAD_SECRET is required in production.`

### Production Schema Rule

During active CMS schema development:

1. Keep `PAYLOAD_POSTGRES_PUSH=false` in production.
2. Add a migration under `src/migrations/`.
3. Register it in `src/migrations/index.ts`.
4. Deploy and let Payload run `prodMigrations` on startup.
5. Confirm admin, public API, and database counts.

Only use `PAYLOAD_POSTGRES_PUSH=true` as an emergency recovery path, and set it back to `false` immediately after the schema is stable.

## 5. Public Routes

### Homepage: `/`

The homepage is reviewer-focused. Current target design:

- Header with project branding, key public navigation, auth links, donate button, and search.
- First section with three columns:
  - Left rail: "From The Golden Age" historical/intellectual profile rail.
  - Center: portrait wall modeled after Web of Stories behavior. A featured personality should appear inside the portrait grid with a slightly larger image tile. Hover shows a preview. Click opens a video/story popup.
  - Right rail: "Our Sponsors" sponsor ad stack. This now reads published Payload sponsor records first, with static seed sponsors as a fallback.
- Second section:
  - Main column: Editor's Pick personality/story feature.
  - Side column: Popular personalities.

Articles and stories remain available as pages, but they should not dominate the homepage during MVP review.

### Public Archive Routes

- `/personalities`: Public people directory. This now reads published Payload people first, with static seed data as a fallback for local/demo safety.
- `/personalities/[slug]`: Public person dossier. This now reads the published Payload person by slug first, with static seed data as a fallback.
- `/stories`: Public story/video/audio chapter listing.
- `/stories/[slug]`: Story page with media, transcript, related records, and timestamp list.
- `/articles`: Encyclopedia-style article listing.
- `/articles/[slug]`: Long-form article page.
- `/muslims-in-history`: Historical/Golden Age context section.
- `/themes`: Topic/theme index.
- `/timelines`: Timeline/event index.
- `/sources`: Public source/citation index.
- `/sponsors`: Sponsor listing. This now reads published Payload sponsor records first, with static seed data as a fallback.
- `/sponsors/[slug]`: Sponsor detail page with gratitude copy, impact highlights, sponsor commendation, source-backed trust notes, and CMS-linked supported people/stories when relationships are present.
- `/contributors`: Contributor profile or contributor information page.
- `/workflow`: Submission/review process page.
- `/ask`: AI Ask demo page.
- `/donate`: Donation intent page.
- `/blog`: Blog placeholder/listing.
- `/search`: Search results route.

## 6. Admin Routes

- `/admin`: Payload admin dashboard.
- `/admin/login`: Payload login screen. This should be branded as Muslim Impactors, not Payload.
- `/admin/collections/users`: User management. Must be restricted.
- `/admin/collections/people`: Public Personalities.
- `/admin/collections/stories`: Stories.
- `/admin/collections/articles`: Articles.
- `/admin/collections/sponsors`: Sponsors.
- `/admin/collections/sources`: Sources.
- `/admin/globals/site-settings`: Homepage and branding settings.
- `/admin-ai`: Super-admin-only Admin AI Command Center. Also linked from the Payload admin navigation for super admins.

The admin shell and login view use Muslim Impactors branding through Payload admin graphic overrides.

## 7. Access Roles

Roles are defined in `src/access/roles.ts`.

Current roles:

- `subscriber`: Public or basic registered user.
- `author`: Contributor role.
- `writer_researcher`: Internal writer/researcher.
- `editor`: Editorial reviewer.
- `legal_rights_reviewer`: Rights/legal reviewer.
- `social_manager`: Social publishing role.
- `publisher_admin`: Publisher/Admin.
- `super_admin`: Super Admin.
- `read_only_reviewer`: Internal review user.

Important permission rules:

- Public users can read only published content.
- Logged-in internal users can read draft/internal content.
- Subscribers should not browse other users.
- Publisher/Admin and Super Admin can publish records.
- Super Admin has the highest administrative authority.
- Audit logs and visitor events should be visible only to authorized internal roles.

## 8. Publishing Workflow

Most public collections use a workflow status field:

- `draft`: Record is being written.
- `in_review`: Record is ready for editorial review.
- `rights_review`: Record needs rights/legal review.
- `ready_to_publish`: Record is approved but not live.
- `published`: Record is live for public users.
- `archived`: Record is retained but not active.

Publishing gates are enforced by `validatePublishGate`.

Common approval fields:

- `editorApproved`: Confirms editorial/factual review.
- `rightsCleared`: Confirms media/source rights review where required.
- `expertApproved`: Confirms expert approval where relevant.
- `reviewNotes`: Internal notes for approval decisions.

## 9. Collection Reference

### Users

Purpose: CMS users, contributors, subscribers, editors, admins, and reviewers.

Key fields:

- `email`: Login identity.
- `name`: Display/internal user name.
- `role`: Permission role.
- `requestedPublicRole`: Requested contributor type during signup.
- `publicContributorProfile`: Public-facing contributor details.
- `assignedTopics`: Optional topic assignments.
- `active`: Enables/disables account.
- `notes`: Internal admin notes.

Why these fields exist:

- The role field controls access.
- Public contributor fields allow approved authors/editors to be shown later.
- Assignment fields support editorial operations.
- Users are protected so general users cannot browse other users.

### Media

Purpose: Images, PDFs, audio, video, document scans, and approved media metadata.

Key fields:

- Uploaded file metadata.
- Alt text and caption fields.
- License/right fields.
- Source/credit fields.
- AI disclosure fields.
- Watermark/public delivery flags.
- Workflow fields.

Why these fields exist:

- This archive depends heavily on licensed and archival media.
- Every public media item needs an origin, license, rights status, and display approval.
- The watermark flags support the requirement to watermark large images where appropriate.

### Sources

Purpose: Structured citations for books, interviews, news articles, web pages, archival footage, documents, and video sources.

Key fields:

- `sourceType`: Book, article, interview, archival record, video, website, etc.
- `title`, `shortCitation`, `fullCitation`: Public and editor-friendly citation formats.
- Author/publication/publisher/date/page fields.
- URL/archive/accessed fields.
- Interview details.
- Archival location and accession details.
- Rights and reliability notes.
- Related people/topics.
- Workflow status.

Why these fields exist:

- The site must support source-backed encyclopedia and documentary-style content.
- Sources need enough structure to generate public reference lists and internal fact-checking notes.

### Sponsors

Purpose: Sponsor records, homepage sponsor ads, sponsor detail pages, and sponsor-to-content attribution.

Current key fields:

- `name`: Sponsor name.
- `slug`: Public URL slug.
- `sponsorType`: Organization, foundation, individual, family, institution, or campaign.
- `summary`: Short public sponsor description.
- `gratitudeStatement`: Public gratitude copy shown near the top of the sponsor page.
- `focus`: Short public focus line for sponsor cards and the sponsor page aside.
- `impactHighlights`: Repeatable public impact cards with label, value, and body.
- `recognitionPoints`: Repeatable sponsor recognition bullets.
- `detailSections`: Repeatable long-form public sections for context, references, or program notes.
- `websiteUrl`: External sponsor website.
- `logo`: Media relation for logo.
- `homepageAdEnabled`: Allows homepage sponsor stack placement.
- `adPlacementOrder`: Default sponsor order.
- `bannerLabel`: Label shown on homepage/sponsor cards.
- `bannerImage`: Wide sponsor image/banner.
- `sponsorPageDetails`: Public detail copy.
- `primaryCallToActionLabel`: CTA button label.
- `primaryCallToActionUrl`: CTA URL.
- `sponsoredPeople`, `sponsoredStories`, `sponsoredArticles`, `sponsoredEssays`, `sponsoredPages`: Content relationships.
- `publicCreditLine`: Public sponsor credit wording.
- Approval and workflow fields.

Why these fields exist:

- Sponsors need public pages, homepage ad placement, and direct relationships to funded/supported content.
- Sponsors may need CTA links for lead generation or visibility.
- Editorial independence must remain visible: sponsor support does not bypass editorial review.
- Public sponsor pages now use published Payload records first. Static sponsor rows are retained only as local/demo fallback when CMS data is empty or temporarily unavailable.
- Draft sponsor records remain hidden from public sponsor listing/detail routes because the frontend data layer only queries `workflowStatus = published`.

Current public sponsor page model:

- Opens with gratitude and a plain-language explanation of what sponsor support helps make possible.
- Shows impact highlight cards for archive visibility, community benefit, and review status.
- Frames sponsor recognition as commendation without inventing unverified humanitarian or Muslim-community claims.
- Shows linked profiles/stories as "work this support helps showcase" rather than implying ownership or editorial control.
- Includes a trust panel explaining that public sponsor claims stay source-backed and sponsor edits are logged.

Recommended next sponsor fields:

- `verifiedClaims`: Repeatable source-backed facts about the sponsor.
- `sourceLinks`: URLs or source references for those claims.
- `ctaBlocks`: Multiple CTA options such as website, inquiry, property page, brochure, or phone/email.
- `researchNotes`: Internal notes for AI/manual research, explicitly marked as not public until reviewed.
- `visibilityGoal`: Sponsor objective such as travel, real estate lead generation, public benefit awareness, community recognition, or recruitment.

### Topics

Purpose: Themes, categories, and subcategories.

Key fields:

- `name`
- `slug`
- `parentTopic`
- `summary`
- workflow/approval fields

Why these fields exist:

- Topics are used for public browsing and internal indexing.
- `parentTopic` enables categories and subcategories.

### Tags

Purpose: Flexible internal and public labels.

Key fields:

- `name`
- `slug`
- `description`

Why these fields exist:

- Tags allow lightweight labeling without changing the category tree.

### Occupations

Purpose: Standard occupation/role labels for people.

Key fields:

- `name`
- `slug`
- `description`

Why these fields exist:

- Occupation labels support filtering, search, and consistent profile cards.

### Places

Purpose: Cities, regions, institutions, countries, and historically relevant places.

Key fields:

- `name`
- `slug`
- `placeType`
- `summary`
- location metadata where available.

Why these fields exist:

- People, stories, and articles often need geographical context.

### People

Purpose: Public personality dossiers for American Muslim impactors, historical Muslim figures, contributors, reviewers, and related personalities.

Key fields:

- `name`: Public display name.
- `slug`: URL identifier.
- `displayTitle`: Optional extended title or honorific.
- `personType`: Main role category.
- `aliases`: Alternate names.
- `honorificName`: Traditional/honorific name.
- `eraLabel`: Human-readable era or dates.
- `scholarlyTradition`: Discipline, movement, or tradition.
- `primaryWorks`: Works, institutions, inventions, or legacy items.
- `birthDateText`, `birthDate`, `deathDateText`, `deathDate`: Flexible dates.
- `birthPlace`: Public birthplace text.
- `nationality`: Region, polity, or identity label.
- `occupations`: Occupation relationships.
- `shortBio`: Card/search intro.
- `fullBio`: Long biography.
- `portrait`: Approved media relationship.
- `portraitCreditOverride`: Public credit override.
- `youtubeEmbedId`: Featured YouTube embed ID.
- `externalVideoUrl`, `externalVideoSource`, `externalVideoNote`: External video metadata.
- `relatedTopics`, `tags`, `relatedPeople`, `relatedPlaces`: Discovery relationships.
- `timelineEvents`: Person-specific timeline items.
- `sources`: Citation relationships.
- `sponsorship`: Sponsor relationships and credit.
- Approval, SEO, workflow, and editorial notes.

Why these fields exist:

- The person page is the core archive unit.
- The fields support both modern public-service personalities and historical intellectual figures.
- Relationship fields connect each person to stories, articles, sources, sponsors, topics, tags, and places.

People classification field:

- `archiveTrack`: Explicitly differentiates `american_civic_impact`, `golden_age_history`, `global_modern_impact`, `contributor`, and `other`. This makes Golden Age vs current American/civic profiles clear in admin and public filtering.
- `homepageDisplayEnabled`: Explicit admin switch controlling whether a published modern profile can appear in the landing-page portrait rotation.
- `displayPriority`: Numeric homepage priority from `001` (highest) to `999` (lowest). Profiles with similar priority rotate between visits instead of producing a permanently static grid.
- `displayRegion`: Landing-page audience region: `us`, `na`, `uk`, `eu`, or `global`.
- `countryCode`: Optional ISO two-letter country code such as `US`, `CA`, or `GB` for editorial filtering and future country-level views.
- `hoverBannerText`: Admin-maintained wording shown in the portrait hover information banner. Public cards use this field first and only use legacy story wording as a fallback.
- `socialPromotionEnabled`: Indicates whether the profile can enter the social-manager promotion queue.
- `socialPostFrequencyDays`: Minimum intended number of days between promotions for this profile.
- `socialDisplayPriority`: Social queue priority from `001` (highest) to `999` (lowest).
- `socialLastPublishedAt`: Automatically updated from a related Social Post when its status first changes to `published`.
- `socialPublishedCount`: Automatically incremented when a related Social Post changes to `published`.

Admin workflow for a new landing-page profile:

1. Create the person and upload/select an approved portrait in `Public Personalities`.
2. Set `archiveTrack` to `american_civic_impact` or `global_modern_impact`.
3. Enable `homepageDisplayEnabled`.
4. Assign `displayPriority`, `displayRegion`, and optional `countryCode`.
5. Write the profile-specific `hoverBannerText`.
6. Complete the existing approval workflow and publish the profile.

### Stories

Purpose: Video, audio, document, text, and expert-commentary chapters.

Key fields:

- `title`
- `slug`
- `subtitle`
- `format`
- `primaryPerson`
- `relatedPeople`
- `relatedArticles`
- `storyOrder`
- `summary`
- `body`
- `videoAsset`
- `youtubeEmbedId`
- `externalVideoUrl`
- `externalVideoSource`
- `externalVideoNote`
- `audioAsset`
- `documentAssets`
- `thumbnail`
- `durationSeconds`
- `transcript`
- `transcriptSegments`
- `themes`
- `tags`
- `placesMentioned`
- `sources`
- `sponsorship`
- `credits`
- `aiDisclosure`
- `publicAiLabel`
- `rightsStatus`
- `metrics`
- Approval, SEO, workflow, and editorial notes.

Why these fields exist:

- The project needs Web of Stories style video chapters with searchable timestamps and transcripts.
- Transcript segments allow timestamp search and future jump-to-time playback.
- Media fields support video, audio, document-led stories, and AI-generated videos with explicit labels.

### Articles

Purpose: Encyclopedia-style pages for concepts, events, places, organizations, policies, timelines, and context articles.

Key fields:

- `title`
- `slug`
- `articleType`
- `leadSummary`
- `infobox`
- `tableOfContentsEnabled`
- `sections`
- `contentBlocks`
- `relatedPeople`
- `relatedStories`
- `relatedTopics`
- `relatedPlaces`
- `sources`
- `sponsorship`
- review fields
- approval fields
- SEO, workflow, editorial notes.

Why these fields exist:

- Articles are the Wikipedia-style layer of the archive.
- Sections and sources allow structured long-form content.
- Content blocks support page-builder style layouts when a page needs something more than plain article text.

### Expert Essays

Purpose: Essays submitted by external or internal experts and entered by editors.

Key fields:

- `title`, `slug`
- `expertAuthor`
- author dashboard upload/extraction/editing fields
- essay content
- `expertApproved`
- related people/topics/stories/articles
- sources/sponsorship/rights/review fields.

Why these fields exist:

- Experts do not need to log into the CMS for MVP.
- Editors can upload Word/PDF source material, edit it internally, and mark the final text as expert approved.

### Pages

Purpose: Flexible CMS page builder for special pages, topic landings, research pages, and campaign pages.

Key fields:

- `title`
- `slug`
- `layoutBlocks`
- related entities
- sources/sponsorship/workflow/SEO fields.

Why these fields exist:

- Some pages need custom modules rather than fixed article or story templates.
- This supports the requirement for admin-selectable modules on pages.

### Contributor Applications

Purpose: Public signup or contributor-interest submissions.

Key fields:

- name/contact fields
- role requested
- biography/expertise
- proposed topics
- rights/source ownership declarations
- review status.

Why these fields exist:

- Visitors can express interest in becoming authors, editors, or contributors.
- Internal team can approve contributors before giving broader CMS access.

### AI Jobs

Purpose: Track AI-assisted jobs such as video generation requests, summarization, extraction, or research assistance.

Key fields:

- job title/type
- prompt/request details
- source records
- status
- result/notes
- reviewer/approval fields.

Why these fields exist:

- AI output must be treated as a workflow artifact, not automatically published content.
- This supports transparency, review, and future automation.

Admin AI Command Center:

- Route: `/admin-ai`.
- Access: super admins only. Unauthenticated or non-super-admin users are redirected or rejected by the API.
- Admin visibility: super admins get an "Admin AI Command Center" link in the Payload admin navigation.
- API route: `/api/admin-ai`.
- Every preview and execution request is stored in `AI Jobs` with the prompt and structured operation result.
- Supported execute operations in the current controlled v0:
  - Bulk-update `people.archiveTrack` for named people or all people when explicitly requested.
  - Update external YouTube/video fields for named people.
  - Create draft sponsor records from names.
  - Create draft source records from supplied URLs.
- Requests for code changes, schema changes, permission changes, secrets, deployments, or broad UI changes are captured as review jobs and are not directly executed from production chat.

### Social Accounts

Purpose: Store social publishing account metadata and permissions.

Key fields:

- label/platform/account metadata
- ownership/connected user
- status and permissions.
- supported platforms: LinkedIn, X, Facebook, and Instagram.

Why these fields exist:

- The project may later allow approved users to publish updates to LinkedIn or X/Twitter from the app.
- Credentials/secrets must remain outside public content and protected by roles.

### Social Posts

Purpose: Draft and review social media posts connected to archive content.

Key fields:

- title
- platform/account
- post copy/media
- related content
- status and publish metadata.
- `sourcePerson`: Connects the social item to the promoted profile for frequency and audit reporting.
- platform variants for LinkedIn, X, Facebook, and Instagram.
- `scheduledFor`, `publishedAt`, `remotePostIds`, `errorLog`, and `analyticsSnapshot` for operational audit.

Why these fields exist:

- Editorial team can prepare social posts from archive content with approval tracking.

Current social operating model:

1. The Social Manager creates a Social Post, connects it to `sourcePerson`, writes the platform variants, and moves it to `in_review`.
2. A Publisher / Admin approves, schedules, or marks the post published. Social Managers cannot self-approve a post into `approved`, `scheduled`, or `published` status.
3. Marking the post `published` automatically sets `publishedAt`, updates the person's `socialLastPublishedAt`, and increments `socialPublishedCount`.
4. Native platform URLs/IDs belong in `remotePostIds`; performance snapshots belong in `analyticsSnapshot`.

Recommended automation path:

- Use the manual approval workflow above first. It supports a dedicated social-media person immediately and keeps every publish action reviewable.
- Add direct publishing only after the organization has approved accounts and API access for Meta Graph API (Facebook/Instagram), LinkedIn, and X.
- Run approved scheduled posts through a separate Railway worker or scheduled job. Store OAuth credentials in Railway secrets; `tokenReference` stores only the secret reference name, never the token itself.
- The worker should publish only `approved` or `scheduled` posts, record platform response IDs/errors, and then move the record to `published` or `failed`.
- Keep publisher approval mandatory even after automation. AI may draft and adapt copy, but it should not publish autonomously.

### Audit Logs

Purpose: Internal record of content changes and publish actions.

Key fields:

- `action`
- `collectionSlug`
- `documentId`
- `documentTitle`
- `changedBy`
- `changedByEmail`
- `changedAt`
- `publishedBy`
- `publishedAt`
- `summary`
- `changedFields`
- `beforeSnapshot`
- `afterSnapshot`

Why these fields exist:

- Admins need to know who changed what, when it changed, and who published it.
- This supports reviewer questions about accountability and internal governance.

### Visitor Events

Purpose: Lightweight public visit and task tracking.

Key fields:

- `eventType`
- `path`
- `targetType`
- `targetSlug`
- `visitorId`
- `ipAddress`
- `referrer`
- `userAgent`
- `metadata`
- `occurredAt`

Why these fields exist:

- Reviewers asked whether visits and user actions can be tracked.
- This collection records basic event-level activity for audit and product review.
- Access must remain restricted to authorized internal roles.

### Site Settings Global

Purpose: CMS-controlled homepage and branding settings.

Key groups:

- `homepageCopy`: Wording for left Golden Age rail and right sponsor rail.
- `homepage`: Featured personality, scheduled override, Editor's Pick, Golden Age highlights, recommended videos, sponsor ad slots.
- `aiDesignAssistant`: Legacy safe admin notes for plain-language UI/UX change requests. Super admins should use `/admin-ai` for preview/execute CMS commands.
- `branding`: Dynamic color settings.

Why these fields exist:

- Admins need to change homepage selections, sponsor order, and brand colors without code changes.
- AI design requests should be recorded safely. Only explicitly whitelisted CMS/data operations execute through `/admin-ai`; code and backend behavior requests stay review-only.

## 10. Data Relationships

Core relationships:

- People connect to stories, articles, topics, tags, places, sources, sponsors, and other people.
- Stories connect to a primary person, related people, articles, topics, tags, places, sources, sponsors, media, transcripts, and metrics.
- Articles connect to people, stories, topics, places, sources, sponsors, and page blocks.
- Sponsors connect to people, stories, articles, essays, and pages.
- Sources connect to people and topics, and are referenced by people/stories/articles.
- Topics can have parent topics to support category/subcategory browsing.
- Site settings select homepage people, stories, sponsors, colors, and copy.
- Audit logs record CMS changes.
- Visitor events record public actions.

## 11. Golden Age vs Modern American Civic Content

Current differentiation uses the dedicated `archiveTrack` field on People:

- `american_civic_impact`: modern/current United States-facing civic, public-service, cultural, professional, business, or humanitarian profiles.
- `golden_age_history`: historical Muslim intellectual, scientific, scholarly, institutional, or cultural figures used for the left homepage rail and the Muslims in History section.
- `global_modern_impact`: modern profiles that are globally relevant but not primarily United States civic profiles.
- `contributor`: expert contributors, editors, institutional contacts, or people who support the archive rather than serving as primary public profiles.
- `other`: temporary classification for records that need editorial sorting.

`archiveTrack` is used in admin columns, seed data, CMS-to-public People mapping, and public people filtering. The current `/personalities` route hides Golden Age and contributor records so the public directory stays focused on modern civic/professional personalities. The Muslims in History section and homepage left rail are the correct public surfaces for Golden Age records.

Production migration:

- `src/migrations/20260530_082500_add_people_archive_track.ts` creates the Postgres enum, adds `people.archive_track`, and backfills existing records.
- `src/migrations/index.ts` registers the migration for Payload `prodMigrations`.
- Keep `PAYLOAD_POSTGRES_PUSH=false` so production schema changes move through committed migrations rather than automatic push.

Bulk archive-track/data updates:

- Payload can edit `archiveTrack` per People record. This project does not currently add a custom admin bulk-action UI for that field, so true bulk updates should use a committed migration or seed patch so the change is reviewable, repeatable, and deployable.
- American civic impact profile enrichment is now centralized in `src/data/americanCivicProfiles.ts`.
- Migration `20260530_153000_curate_american_civic_profiles` is intentionally no-op after the first Railway deploy exposed Payload/Postgres runtime migration risk. The public app now applies the curated Full Bio copy and conservative video policy in the frontend mapping layer and the seed script keeps local/staging data repeatable.
- The homepage civic/professional portrait set is driven by the 36-name static American civic profile order in `archiveData.ts`; the configured homepage featured-personality guard follows that same pool.

## 12. Sponsor Workflow

Sponsor records should support both public recognition and internal accountability.

Recommended sponsor content workflow:

1. Create sponsor record in Admin.
2. Add sponsor name, slug, type, summary, website, logo/banner.
3. Add gratitude statement, public focus line, impact highlight cards, recognition points, and detail sections.
4. Add verified public details only from approved documents or credible sources.
5. Add CTA links such as sponsor website, campaign page, inquiry page, brochure, or phone/email.
6. Connect sponsored people, stories, articles, essays, or pages.
7. Set homepage ad placement and order if sponsor should appear on the homepage.
8. Editor reviews copy and confirms that claims are source-backed.
9. Publisher publishes. Draft sponsors remain private and do not appear on public sponsor pages.

Current sponsor page presentation requirements:

- The page should feel like a sponsor recognition and public gratitude page, not a placeholder CMS detail page.
- It should explain how sponsor support helps the archive surface public-service stories, research, educational presentation, and community memory.
- It should not claim specific humanitarian, Muslim-community, charitable, or business impact unless those claims have approved sources or sponsor-provided materials.
- It should make editorial independence and auditability visible so sponsor recognition does not weaken public trust.

AI-assisted sponsor research rule:

- AI may collect candidate details and links.
- AI must not publish unsupported claims.
- Every sponsor claim should be stored with source notes or explicitly marked as unverified internal research.
- Public sponsor pages should use only editor-approved claims.

## 13. Video Workflow

People and stories support video through:

- `youtubeEmbedId`
- `externalVideoUrl`
- `externalVideoSource`
- `externalVideoNote`
- media relationships

Current public behavior:

- If a verified relevant video exists, show the video.
- If no verified video exists, show an empty video placeholder with neutral wording.
- Do not embed random or non-English videos just to fill space.
- Store source/channel/rights notes for every external video.
- Generic category-level video fallbacks are disabled for public personality/story pages. Story embeds are only trusted when they are person-specific or when a CMS record has an approved `youtubeEmbedId`.
- Current curated video exception: Jawed Karim uses `jNQXAC9IVRw` (`Me at the zoo`) as a verified platform-history video tied directly to his YouTube co-founder record. Most other American civic profiles intentionally show the placeholder until a specific source/relevance check is completed.
- AI-generated video must have explicit public AI labeling.

## 14. Homepage Control Model

The homepage should be controlled by `Homepage & Branding`.

Expected controls:

- Daily featured personality.
- Scheduled featured personality override.
- Editor's Pick.
- Golden Age left rail highlights.
- Recommended videos.
- Sponsor ad slots and ordering.
- Left/right rail headings and optional body text.
- Brand colors.
- Safe AI design request notes.
- Per-profile landing-page enable switch, region, country code, priority, and hover-banner wording in `Public Personalities`.

Portrait rotation and region behavior:

- The homepage now reads published modern profiles from Payload instead of relying only on the static seed list.
- Existing American civic records are enabled and assigned to `US` during migration. Existing `global_modern_impact` records remain disabled until an admin reviews the record, assigns its intended region/country, and explicitly enables homepage display.
- The region selector offers United States, North America, United Kingdom, and Europe. The default `US / North America` view includes `us`, `na`, and `global` profiles.
- A profile tagged `us` also matches North America. A profile tagged `uk` also matches Europe. `global` profiles match every selection.
- Each browser visit increments a local visit counter. The counter changes the deterministic rotation among similarly prioritized profiles, so repeated visits do not preserve the same card order.
- Priority remains meaningful: `001` is strongest and `999` is weakest. The six highest-priority eligible profiles are guaranteed positions on every visit.
- Up to six newest eligible records are also guaranteed positions so recent additions are not hidden behind older records.
- The remaining portrait positions come from a visit-specific weighted rotation pool. Display priority influences the pool score, but the visit counter changes which additional profiles are surfaced.
- The grid displays at most 24 eligible profiles. An explicitly configured featured profile is retained only when it matches the selected region.
- A visitor's region selection is stored locally in that browser. Without a saved selection, the homepage defaults to `US / North America`.

Expected homepage copy:

- Left column headline: `From The Golden Age`
- Right column headline: `Our Sponsors`
- Supporting text should be optional and disabled by default.

## 15. Admin Branding Requirement

The Payload default logo and word "Payload" should not be shown to reviewers/admin users if possible. The admin login screen and admin shell should use Muslim Impactors branding.

Implemented setup:

- Custom Payload admin logo and icon components are configured.
- Admin metadata/title suffix is set to Muslim Impactors.
- Payload import map includes the custom admin brand components.
- `admin.suppressHydrationWarning` is enabled because browser extensions can inject attributes into the admin shell before React hydrates.
- Verify `/admin/login` and `/admin` locally and live after each deploy that touches admin components.

Screenshot/hydration note:

- The May 30, 2026 local screenshot showed a Next.js hydration warning on `/admin/globals/site-settings`.
- The mismatch was `cz-shortcut-listen="true"` on `<body>`, which is typically injected by a browser extension before React hydrates.
- This is not a Payload data-loss or database issue.
- The defensive config is `admin.suppressHydrationWarning: true` in `src/payload.config.ts`.
- The public frontend layout also sets `suppressHydrationWarning` on `<html>` and `<body>` for the same extension-injection case.
- If the warning persists in one browser, retest in a clean profile/incognito window with extensions disabled before changing application code.

Local verification result:

- After current code and local SQLite backfill, `/admin/login` renders the custom `Muslim Impactors` admin logo and document title `Login - Muslim Impactors`.
- The live admin route must be checked after Railway finishes serving the latest pushed commit, because the old build can continue serving temporarily during deployment.

## 16. Audit And Visitor Tracking

CMS audit logs:

- Trigger on collection changes through `withAudit`.
- Store changed collection, record ID/title, user/email, timestamps, changed fields, before/after snapshots.
- Visible only to authorized internal roles.

Visitor events:

- Public frontend can call `/api/visitor-event`.
- Events should include page views, search, sponsor clicks, profile opens, video opens, signup starts, donate clicks, and other tasks.
- Visitor logs are for review and basic audit, not full analytics.

## 17. Deployment Workflow

Standard workflow:

1. Make local code changes.
2. If the change is a rollback-sensitive milestone, create a git tag before editing:

```bash
git tag -a backup/reviewer-demo-cleanup-20260530 -m "Backup before reviewer cleanup"
git push origin backup/reviewer-demo-cleanup-20260530
```

The current rollback reference is `backup/reviewer-demo-cleanup-20260530`, pointing to commit `383a7bc`.

3. Run type generation if Payload schema changed:

```bash
npm run generate:types
npm run generate:importmap
```

4. Build:

```bash
npm run build
```

5. Commit and push to GitHub:

```bash
git add .
git commit -m "Meaningful message"
git push origin main
```

6. Railway auto-deploys from GitHub.
7. Verify:

```text
https://muslimimpactors.americanmotivations.com/health
https://muslimimpactors.americanmotivations.com/
https://muslimimpactors.americanmotivations.com/admin/login
https://muslimimpactors.americanmotivations.com/api/people?limit=1
```

8. Confirm the live build is actually new, not only responding:

- Homepage should include `.review-home-grid`.
- Admin login title should be `Login - Muslim Impactors`.
- Admin login brand should render the custom Muslim Impactors logo, not the default Payload logo.
- `/api/people?limit=1` should return records.

9. Keep `PAYLOAD_POSTGRES_PUSH=false`; schema changes should deploy through committed migrations.

Current deployment note:

- Commit `7150539` contains the CMS People cutover, admin branding, `archiveTrack` migration, visitor-event helper, video placeholder behavior, updated tests, and this reference document.
- Commit `06dd404` adds the hydration-warning suppression/documentation pass after the May 30, 2026 local admin screenshot.
- The May 30, 2026 Railway failure `Failed to collect page data for /api/visitor-event` was caused by `PAYLOAD_SECRET` being unavailable during the Docker build stage. The app now permits a build-only placeholder secret during `NEXT_PHASE=phase-production-build` while still requiring the real secret at runtime.
- The May 30, 2026 live admin screenshot showing `Nothing found` at `/admin/globals/site-settings` was caused by production Postgres missing the `site_settings` global tables. Migration `20260530_142700_create_site_settings_global` creates the global table, sponsor-slot array table, relationship table, default settings row, constraints, and indexes.
- The American civic impact content pass adds the shared curated profile data file, Full Bio rendering on public personality pages, corrected public person-type fallback data for the 36 civic profiles, and frontend filtering so generic American Muslim video embeds from older CMS records are not rendered on personality/story pages.
- If the live homepage has the reviewer layout but `/admin/login` still says `Login - Payload`, Railway is likely still serving an older build for the admin route or the deploy has not fully rolled forward. Check Railway build/deploy logs for the latest GitHub SHA before changing code.

## 18. QA Checklist

Public pages:

- `/`
- `/personalities`
- `/personalities/muhammad-ali`
- `/stories`
- `/stories/american-muslim-public-life-and-humanity`
- `/articles`
- `/articles/house-of-wisdom`
- `/muslims-in-history`
- `/themes`
- `/timelines`
- `/sponsors`
- `/sponsors/hashim-group`
- `/ask`

Admin:

- `/admin/login` loads with Muslim Impactors branding.
- Login works.
- `Public Personalities` shows records.
- `Stories` shows records.
- `Articles` shows records.
- `Sponsors` shows records and sponsor details.
- `Homepage & Branding` loads and saves.
- `Homepage & Branding` should load without a persistent hydration overlay. A one-off body attribute mismatch mentioning `cz-shortcut-listen` points to browser extension injection; verify in a clean browser profile.
- `Audit Logs` visible to admin roles.
- `Visitor Events` visible to admin roles.
- General/subscriber users cannot browse other users.

Mobile:

- 375px width.
- 390px width.
- 412px width.
- 430px width.
- Header/search must not overlap the logo.
- Portrait grid must not overflow.
- Sponsor cards must stack cleanly.
- Buttons must fit without text clipping.

## 19. Known Pending Items

These items were open at the time this document was created:

1. Add source-link-backed verified sponsor claims, richer CTA blocks, and internal research notes beyond the current gratitude/focus/highlight/recognition CMS fields.
2. Continue CMS-to-frontend cutover beyond People and the homepage portrait grid into Stories, Articles, and search.
3. Verify `Homepage & Branding` loads and saves for non-technical admin users after each Payload schema/admin change.
4. Continue adding verified person-specific videos per personality/story. The system now shows placeholders where no approved video exists and avoids generic fallback embeds.
5. Expand visitor-event coverage where new public tasks are added.
6. Keep `PAYLOAD_POSTGRES_PUSH=false` and use migrations for production schema changes.
7. Direct social publishing remains intentionally disconnected until production Meta, LinkedIn, and X API credentials and account-review requirements are available. The manual approval and audit workflow is ready now.

## 20. Developer Notes

- Do not hardcode secrets.
- Do not paste database URLs or Payload secrets into chats, docs, issues, or commits.
- Do not publish AI-generated or AI-assisted content without explicit review labels and source checks.
- Keep public homepage copy simple for MVP review.
- Use Payload relationships instead of duplicating public data across collections.
- Keep the seeded data useful for demonstration, but do not treat it as final editorial content.
