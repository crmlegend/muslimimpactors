import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_people_display_region" AS ENUM(
        'us',
        'na',
        'uk',
        'eu',
        'global'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "people"
      ADD COLUMN IF NOT EXISTS "homepage_display_enabled" boolean DEFAULT false NOT NULL,
      ADD COLUMN IF NOT EXISTS "display_priority" numeric DEFAULT 500 NOT NULL,
      ADD COLUMN IF NOT EXISTS "display_region" "public"."enum_people_display_region" DEFAULT 'global' NOT NULL,
      ADD COLUMN IF NOT EXISTS "country_code" varchar,
      ADD COLUMN IF NOT EXISTS "hover_banner_text" varchar,
      ADD COLUMN IF NOT EXISTS "social_promotion_enabled" boolean DEFAULT false NOT NULL,
      ADD COLUMN IF NOT EXISTS "social_post_frequency_days" numeric DEFAULT 30 NOT NULL,
      ADD COLUMN IF NOT EXISTS "social_display_priority" numeric DEFAULT 500 NOT NULL,
      ADD COLUMN IF NOT EXISTS "social_last_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "social_published_count" numeric DEFAULT 0;

    UPDATE "people"
    SET
      "homepage_display_enabled" = true,
      "display_region" = 'us'::"public"."enum_people_display_region",
      "country_code" = COALESCE("country_code", 'US'),
      "social_promotion_enabled" = true
    WHERE "archive_track" = 'american_civic_impact';

    UPDATE "people"
    SET "hover_banner_text" = LEFT("short_bio", 240)
    WHERE "hover_banner_text" IS NULL AND "short_bio" IS NOT NULL;

    ALTER TYPE "public"."enum_social_accounts_platform" ADD VALUE IF NOT EXISTS 'facebook';
    ALTER TYPE "public"."enum_social_accounts_platform" ADD VALUE IF NOT EXISTS 'instagram';
    ALTER TYPE "public"."enum_social_posts_platform_variants_platform" ADD VALUE IF NOT EXISTS 'facebook';
    ALTER TYPE "public"."enum_social_posts_platform_variants_platform" ADD VALUE IF NOT EXISTS 'instagram';
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "people"
        ADD CONSTRAINT "people_display_priority_range"
        CHECK ("display_priority" BETWEEN 1 AND 999);
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "people"
        ADD CONSTRAINT "people_social_display_priority_range"
        CHECK ("social_display_priority" BETWEEN 1 AND 999);
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "people"
        ADD CONSTRAINT "people_social_post_frequency_days_range"
        CHECK ("social_post_frequency_days" BETWEEN 1 AND 365);
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "people_homepage_display_idx"
      ON "people" USING btree ("homepage_display_enabled", "display_region", "display_priority");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "people_homepage_display_idx";

    ALTER TABLE "people" DROP CONSTRAINT IF EXISTS "people_display_priority_range";
    ALTER TABLE "people" DROP CONSTRAINT IF EXISTS "people_social_display_priority_range";
    ALTER TABLE "people" DROP CONSTRAINT IF EXISTS "people_social_post_frequency_days_range";

    ALTER TABLE "people"
      DROP COLUMN IF EXISTS "homepage_display_enabled",
      DROP COLUMN IF EXISTS "display_priority",
      DROP COLUMN IF EXISTS "display_region",
      DROP COLUMN IF EXISTS "country_code",
      DROP COLUMN IF EXISTS "hover_banner_text",
      DROP COLUMN IF EXISTS "social_promotion_enabled",
      DROP COLUMN IF EXISTS "social_post_frequency_days",
      DROP COLUMN IF EXISTS "social_display_priority",
      DROP COLUMN IF EXISTS "social_last_published_at",
      DROP COLUMN IF EXISTS "social_published_count";

    DROP TYPE IF EXISTS "public"."enum_people_display_region";
  `)
}
