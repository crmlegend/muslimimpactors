import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "people"
    SET
      "homepage_display_enabled" = false,
      "social_promotion_enabled" = false
    WHERE "archive_track" = 'global_modern_impact'
      AND "display_region" = 'global'
      AND "country_code" IS NULL
      AND "display_priority" = 500;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "people"
    SET "homepage_display_enabled" = true
    WHERE "archive_track" = 'global_modern_impact'
      AND "display_region" = 'global'
      AND "country_code" IS NULL
      AND "display_priority" = 500;
  `)
}
