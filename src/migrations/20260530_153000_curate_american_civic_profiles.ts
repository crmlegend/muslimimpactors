import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import {
  americanCivicProfileUpdates,
  noApprovedVideoNote,
} from '../data/americanCivicProfiles'

const richText = (paragraphs: string[]) => ({
  root: {
    children: paragraphs.map((paragraph) => ({
      children: [
        {
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: paragraph,
          type: 'text',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'paragraph',
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

const sourceBlock = (sourceUrls: string[]) =>
  ['Curated biography sources:', ...sourceUrls].join('\n')

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "people"
    SET
      "youtube_embed_id" = NULL,
      "external_video_url" = NULL,
      "external_video_source" = NULL,
      "external_video_note" = ${noApprovedVideoNote},
      "updated_at" = now()
    WHERE "slug" <> 'jawed-karim'
      AND "youtube_embed_id" IS NOT NULL
      AND (
        "youtube_embed_id" = 'BpeZAm7rKHY'
        OR "external_video_note" ILIKE 'Theme-level seed embed%'
        OR "external_video_note" ILIKE 'Person-specific seed embed%'
      );
  `)

  await db.execute(sql`
    UPDATE "stories"
    SET
      "youtube_embed_id" = NULL,
      "external_video_url" = NULL,
      "external_video_source" = NULL,
      "external_video_note" = ${noApprovedVideoNote},
      "updated_at" = now()
    WHERE "youtube_embed_id" = 'BpeZAm7rKHY'
      OR "external_video_note" ILIKE 'Theme-level seed embed%';
  `)

  for (const profile of americanCivicProfileUpdates) {
    const video = profile.video
    const fullBio = JSON.stringify(richText(profile.fullBio))
    const sources = sourceBlock(profile.sourceUrls)

    await db.execute(sql`
      UPDATE "people"
      SET
        "archive_track" = 'american_civic_impact'::"public"."enum_people_archive_track",
        "person_type" = ${profile.personType}::"public"."enum_people_person_type",
        "full_bio" = ${fullBio}::jsonb,
        "primary_works" = CASE
          WHEN COALESCE("primary_works", '') LIKE '%' || ${sources} || '%'
            THEN "primary_works"
          ELSE CONCAT_WS(E'\n\n', NULLIF("primary_works", ''), ${sources})
        END,
        "youtube_embed_id" = ${video?.youtubeEmbedId || null},
        "external_video_url" = ${video?.externalVideoUrl || null},
        "external_video_source" = ${video?.source || null},
        "external_video_note" = ${video?.note || noApprovedVideoNote},
        "workflow_status" = 'published'::"public"."enum_people_workflow_status",
        "editor_approved" = true,
        "updated_at" = now()
      WHERE "slug" = ${profile.slug};
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`SELECT 1;`)
}
