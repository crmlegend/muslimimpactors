import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "homepage_copy_left_rail_eyebrow" varchar DEFAULT 'From The Golden Age',
      "homepage_copy_left_rail_heading" varchar DEFAULT 'From The Golden Age',
      "homepage_copy_show_left_rail_body" boolean DEFAULT false,
      "homepage_copy_left_rail_body" varchar DEFAULT 'A focused rail for scholars, institution builders, physicians, jurists, scientists, and artists who shaped the intellectual foundations behind the archive.',
      "homepage_copy_left_rail_button_label" varchar DEFAULT 'Open Golden Age Index',
      "homepage_copy_right_rail_eyebrow" varchar DEFAULT 'Our Sponsors',
      "homepage_copy_right_rail_heading" varchar DEFAULT 'Our Sponsors',
      "homepage_copy_show_right_rail_body" boolean DEFAULT false,
      "homepage_copy_right_rail_body" varchar,
      "homepage_daily_featured_personality_id" integer,
      "homepage_manual_featured_personality_id" integer,
      "homepage_manual_featured_starts_at" timestamp(3) with time zone,
      "homepage_manual_featured_ends_at" timestamp(3) with time zone,
      "ai_design_assistant_enabled" boolean DEFAULT false,
      "ai_design_assistant_latest_request" varchar,
      "ai_design_assistant_guardrails" varchar DEFAULT 'Do not change collection schemas, permissions, deployment secrets, payment settings, or published content automatically. Treat AI suggestions as drafts requiring admin/developer review.',
      "branding_primary_color" varchar DEFAULT '#0D76BC',
      "branding_secondary_color" varchar DEFAULT '#F2673C',
      "branding_tertiary_color" varchar DEFAULT '#DF5A32',
      "branding_light_accent_color" varchar DEFAULT '#E1DFDE',
      "branding_neutral_color" varchar DEFAULT '#FFFFFF',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "site_settings_homepage_sponsor_ad_slots" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "sponsor_id" integer,
      "placement_label" varchar DEFAULT 'Homepage sponsor',
      "placement_order" numeric DEFAULT 10,
      "active" boolean DEFAULT true
    );

    CREATE TABLE IF NOT EXISTS "site_settings_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "people_id" integer,
      "stories_id" integer
    );

    INSERT INTO "site_settings" (
      "homepage_copy_left_rail_eyebrow",
      "homepage_copy_left_rail_heading",
      "homepage_copy_show_left_rail_body",
      "homepage_copy_left_rail_body",
      "homepage_copy_left_rail_button_label",
      "homepage_copy_right_rail_eyebrow",
      "homepage_copy_right_rail_heading",
      "homepage_copy_show_right_rail_body",
      "ai_design_assistant_enabled",
      "ai_design_assistant_guardrails",
      "branding_primary_color",
      "branding_secondary_color",
      "branding_tertiary_color",
      "branding_light_accent_color",
      "branding_neutral_color"
    )
    SELECT
      'From The Golden Age',
      'From The Golden Age',
      false,
      'A focused rail for scholars, institution builders, physicians, jurists, scientists, and artists who shaped the intellectual foundations behind the archive.',
      'Open Golden Age Index',
      'Our Sponsors',
      'Our Sponsors',
      false,
      false,
      'Do not change collection schemas, permissions, deployment secrets, payment settings, or published content automatically. Treat AI suggestions as drafts requiring admin/developer review.',
      '#0D76BC',
      '#F2673C',
      '#DF5A32',
      '#E1DFDE',
      '#FFFFFF'
    WHERE NOT EXISTS (SELECT 1 FROM "site_settings");

    DO $$
    BEGIN
      ALTER TABLE "site_settings"
        ADD CONSTRAINT "site_settings_homepage_daily_personality_fk"
        FOREIGN KEY ("homepage_daily_featured_personality_id")
        REFERENCES "public"."people"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings"
        ADD CONSTRAINT "site_settings_homepage_manual_personality_fk"
        FOREIGN KEY ("homepage_manual_featured_personality_id")
        REFERENCES "public"."people"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings_homepage_sponsor_ad_slots"
        ADD CONSTRAINT "site_settings_homepage_sponsor_ad_slots_parent_id_fk"
        FOREIGN KEY ("_parent_id")
        REFERENCES "public"."site_settings"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings_homepage_sponsor_ad_slots"
        ADD CONSTRAINT "site_settings_sponsor_slots_sponsor_fk"
        FOREIGN KEY ("sponsor_id")
        REFERENCES "public"."sponsors"("id")
        ON DELETE set null
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_parent_fk"
        FOREIGN KEY ("parent_id")
        REFERENCES "public"."site_settings"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_people_fk"
        FOREIGN KEY ("people_id")
        REFERENCES "public"."people"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$
    BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_stories_fk"
        FOREIGN KEY ("stories_id")
        REFERENCES "public"."stories"("id")
        ON DELETE cascade
        ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_homepage_daily_featured_personality_idx" ON "site_settings" USING btree ("homepage_daily_featured_personality_id");
    CREATE INDEX IF NOT EXISTS "site_settings_homepage_manual_featured_personality_idx" ON "site_settings" USING btree ("homepage_manual_featured_personality_id");
    CREATE INDEX IF NOT EXISTS "site_settings_updated_at_idx" ON "site_settings" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "site_settings_created_at_idx" ON "site_settings" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "site_settings_homepage_sponsor_ad_slots_order_idx" ON "site_settings_homepage_sponsor_ad_slots" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_homepage_sponsor_ad_slots_parent_id_idx" ON "site_settings_homepage_sponsor_ad_slots" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_homepage_sponsor_ad_slots_sponsor_idx" ON "site_settings_homepage_sponsor_ad_slots" USING btree ("sponsor_id");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_people_id_idx" ON "site_settings_rels" USING btree ("people_id");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_stories_id_idx" ON "site_settings_rels" USING btree ("stories_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_rels" CASCADE;
    DROP TABLE IF EXISTS "site_settings_homepage_sponsor_ad_slots" CASCADE;
    DROP TABLE IF EXISTS "site_settings" CASCADE;
  `)
}
