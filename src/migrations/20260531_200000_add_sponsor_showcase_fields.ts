import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "homepage_ad_enabled" boolean DEFAULT false;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "ad_placement_order" numeric DEFAULT 99;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "banner_label" varchar;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "banner_image_id" integer;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "sponsor_page_details" varchar;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "primary_call_to_action_label" varchar;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "primary_call_to_action_url" varchar;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "gratitude_statement" varchar;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" ADD COLUMN IF NOT EXISTS "focus" varchar;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "sponsors_impact_highlights" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "value" varchar NOT NULL,
      "body" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "sponsors_recognition_points" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "point" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "sponsors_detail_sections" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "heading" varchar NOT NULL,
      "body" varchar NOT NULL
    );
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "sponsors"
        ADD CONSTRAINT "sponsors_banner_image_id_media_id_fk"
        FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "sponsors_impact_highlights"
        ADD CONSTRAINT "sponsors_impact_highlights_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."sponsors"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "sponsors_recognition_points"
        ADD CONSTRAINT "sponsors_recognition_points_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."sponsors"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TABLE "sponsors_detail_sections"
        ADD CONSTRAINT "sponsors_detail_sections_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."sponsors"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_banner_image_idx" ON "sponsors" USING btree ("banner_image_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_impact_highlights_order_idx" ON "sponsors_impact_highlights" USING btree ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_impact_highlights_parent_id_idx" ON "sponsors_impact_highlights" USING btree ("_parent_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_recognition_points_order_idx" ON "sponsors_recognition_points" USING btree ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_recognition_points_parent_id_idx" ON "sponsors_recognition_points" USING btree ("_parent_id");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_detail_sections_order_idx" ON "sponsors_detail_sections" USING btree ("_order");
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "sponsors_detail_sections_parent_id_idx" ON "sponsors_detail_sections" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "sponsors_detail_sections" CASCADE;
  `)

  await db.execute(sql`
    DROP TABLE IF EXISTS "sponsors_recognition_points" CASCADE;
  `)

  await db.execute(sql`
    DROP TABLE IF EXISTS "sponsors_impact_highlights" CASCADE;
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" DROP COLUMN IF EXISTS "gratitude_statement";
  `)

  await db.execute(sql`
    ALTER TABLE "sponsors" DROP COLUMN IF EXISTS "focus";
  `)
}
