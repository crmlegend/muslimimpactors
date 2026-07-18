import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

import { reviewedUSHomepageProfiles } from '../data/homepageProfileCuration'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const profile of reviewedUSHomepageProfiles) {
    await db.execute(sql`
      UPDATE "people"
      SET
        "homepage_display_enabled" = true,
        "display_priority" = ${profile.priority},
        "display_region" = 'us'::"public"."enum_people_display_region",
        "country_code" = 'US',
        "hover_banner_text" = ${profile.banner}
      WHERE "slug" = ${profile.slug}
        AND "archive_track" = 'american_civic_impact';
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const profile of reviewedUSHomepageProfiles) {
    await db.execute(sql`
      UPDATE "people"
      SET
        "display_priority" = 500,
        "hover_banner_text" = LEFT("short_bio", 240)
      WHERE "slug" = ${profile.slug}
        AND "archive_track" = 'american_civic_impact';
    `)
  }
}
