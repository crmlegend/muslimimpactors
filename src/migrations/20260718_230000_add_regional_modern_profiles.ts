import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import {
  regionalModernProfiles,
  regionalProfileReleaseMarker,
} from '../data/regionalModernProfiles'

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

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const profile of regionalModernProfiles) {
    await db.execute(sql`
      INSERT INTO "people" (
        "name",
        "slug",
        "display_title",
        "person_type",
        "era_label",
        "scholarly_tradition",
        "nationality",
        "short_bio",
        "full_bio",
        "external_video_note",
        "editor_approved",
        "editor_approved_at",
        "rights_cleared",
        "rights_cleared_at",
        "rights_notes",
        "seo_title",
        "seo_description",
        "workflow_status",
        "editorial_notes",
        "archive_track",
        "homepage_display_enabled",
        "display_priority",
        "display_region",
        "country_code",
        "hover_banner_text",
        "social_promotion_enabled",
        "social_post_frequency_days",
        "social_display_priority",
        "social_published_count",
        "updated_at",
        "created_at"
      )
      VALUES (
        ${profile.name},
        ${profile.slug},
        ${profile.displayTitle},
        ${profile.personType}::"public"."enum_people_person_type",
        'Contemporary',
        ${profile.category},
        ${profile.nationality},
        ${profile.shortBio},
        ${JSON.stringify(richText(profile.fullBio))}::jsonb,
        'No verified, person-specific public video has been approved yet. The public page intentionally shows a neutral video placeholder instead of an unrelated embed.',
        true,
        now(),
        true,
        now(),
        ${regionalProfileReleaseMarker},
        ${`${profile.name} | Muslim Impactors`},
        ${profile.shortBio},
        'published'::"public"."enum_people_workflow_status",
        ${JSON.stringify(
          richText([
            'AI-assisted editorial draft checked against the attached official sources. Reconfirm time-sensitive office titles during the next scheduled content review.',
          ]),
        )}::jsonb,
        'global_modern_impact'::"public"."enum_people_archive_track",
        true,
        ${profile.displayPriority},
        ${profile.displayRegion}::"public"."enum_people_display_region",
        ${profile.countryCode},
        ${profile.hoverBannerText},
        false,
        30,
        ${profile.displayPriority},
        0,
        now(),
        now()
      )
      ON CONFLICT ("slug") DO NOTHING;
    `)

    for (const source of profile.sources) {
      await db.execute(sql`
        INSERT INTO "sources" (
          "source_type",
          "title",
          "short_citation",
          "full_citation",
          "publisher",
          "url",
          "accessed_date",
          "media_type",
          "rights_status",
          "rights_notes",
          "reliability_notes",
          "workflow_status",
          "updated_at",
          "created_at"
        )
        SELECT
          ${source.sourceType}::"public"."enum_sources_source_type",
          ${source.title},
          ${source.shortCitation},
          ${source.fullCitation},
          ${new URL(source.url).hostname},
          ${source.url},
          now(),
          'text'::"public"."enum_sources_media_type",
          'unknown'::"public"."enum_sources_rights_status",
          'Citation and link only; no source text or media is republished.',
          ${regionalProfileReleaseMarker},
          'published'::"public"."enum_sources_workflow_status",
          now(),
          now()
        WHERE NOT EXISTS (
          SELECT 1 FROM "sources" WHERE "url" = ${source.url}
        );
      `)

      await db.execute(sql`
        INSERT INTO "people_rels" ("order", "parent_id", "path", "sources_id")
        SELECT
          COALESCE((
            SELECT MAX("order") + 1
            FROM "people_rels"
            WHERE "parent_id" = person_record."id" AND "path" = 'sources'
          ), 1),
          person_record."id",
          'sources',
          source_record."id"
        FROM "people" AS person_record
        JOIN "sources" AS source_record ON source_record."url" = ${source.url}
        WHERE person_record."slug" = ${profile.slug}
          AND NOT EXISTS (
            SELECT 1
            FROM "people_rels"
            WHERE "parent_id" = person_record."id"
              AND "path" = 'sources'
              AND "sources_id" = source_record."id"
          );
      `)

      await db.execute(sql`
        INSERT INTO "sources_rels" ("order", "parent_id", "path", "people_id")
        SELECT
          COALESCE((
            SELECT MAX("order") + 1
            FROM "sources_rels"
            WHERE "parent_id" = source_record."id" AND "path" = 'relatedPeople'
          ), 1),
          source_record."id",
          'relatedPeople',
          person_record."id"
        FROM "sources" AS source_record
        JOIN "people" AS person_record ON person_record."slug" = ${profile.slug}
        WHERE source_record."url" = ${source.url}
          AND NOT EXISTS (
            SELECT 1
            FROM "sources_rels"
            WHERE "parent_id" = source_record."id"
              AND "path" = 'relatedPeople'
              AND "people_id" = person_record."id"
          );
      `)
    }
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const profileSlugs = regionalModernProfiles.map((profile) => profile.slug)
  const sourceURLs = regionalModernProfiles.flatMap((profile) =>
    profile.sources.map((source) => source.url),
  )

  await db.execute(sql`
    DELETE FROM "sources_rels"
    WHERE "parent_id" IN (
      SELECT "id"
      FROM "sources"
      WHERE "url" IN (${sql.join(
        sourceURLs.map((url) => sql`${url}`),
        sql`, `,
      )})
        AND "reliability_notes" = ${regionalProfileReleaseMarker}
    );
  `)

  await db.execute(sql`
    DELETE FROM "people_rels"
    WHERE "parent_id" IN (
      SELECT "id"
      FROM "people"
      WHERE "slug" IN (${sql.join(
        profileSlugs.map((slug) => sql`${slug}`),
        sql`, `,
      )})
        AND "rights_notes" = ${regionalProfileReleaseMarker}
    )
    OR "sources_id" IN (
      SELECT "id"
      FROM "sources"
      WHERE "url" IN (${sql.join(
        sourceURLs.map((url) => sql`${url}`),
        sql`, `,
      )})
        AND "reliability_notes" = ${regionalProfileReleaseMarker}
    );
  `)

  await db.execute(sql`
    DELETE FROM "people"
    WHERE "slug" IN (${sql.join(
      profileSlugs.map((slug) => sql`${slug}`),
      sql`, `,
    )})
      AND "rights_notes" = ${regionalProfileReleaseMarker};
  `)

  await db.execute(sql`
    DELETE FROM "sources"
    WHERE "url" IN (${sql.join(
      sourceURLs.map((url) => sql`${url}`),
      sql`, `,
    )})
      AND "reliability_notes" = ${regionalProfileReleaseMarker};
  `)
}
