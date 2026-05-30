import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_people_archive_track" AS ENUM(
        'american_civic_impact',
        'golden_age_history',
        'global_modern_impact',
        'contributor',
        'other'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "people"
      ADD COLUMN IF NOT EXISTS "archive_track" "public"."enum_people_archive_track" DEFAULT 'other' NOT NULL;

    UPDATE "people"
    SET "archive_track" = CASE
      WHEN "person_type" = 'expert_contributor'
        THEN 'contributor'::"public"."enum_people_archive_track"
      WHEN LOWER(COALESCE("scholarly_tradition", '')) LIKE 'american %'
        OR LOWER(COALESCE("nationality", '')) LIKE '%united states%'
        OR LOWER(COALESCE("nationality", '')) LIKE '%u.s.%'
        THEN 'american_civic_impact'::"public"."enum_people_archive_track"
      WHEN COALESCE("era_label", '') ~ '[0-9]{4}-'
        THEN 'global_modern_impact'::"public"."enum_people_archive_track"
      ELSE 'golden_age_history'::"public"."enum_people_archive_track"
    END
    WHERE "archive_track" = 'other';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "people" DROP COLUMN IF EXISTS "archive_track";
    DROP TYPE IF EXISTS "public"."enum_people_archive_track";
  `)
}
