import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('subscriber', 'author', 'writer_researcher', 'editor', 'legal_rights_reviewer', 'social_manager', 'publisher_admin', 'super_admin', 'read_only_reviewer');
  CREATE TYPE "public"."enum_users_requested_public_role" AS ENUM('author', 'editor', 'subscriber');
  CREATE TYPE "public"."enum_media_media_kind" AS ENUM('image', 'document', 'audio', 'video', 'word_document', 'generated_derivative', 'other');
  CREATE TYPE "public"."enum_media_rights_status" AS ENUM('owned', 'licensed', 'public_domain', 'permission_granted', 'permission_pending', 'restricted', 'unknown');
  CREATE TYPE "public"."enum_media_ai_disclosure" AS ENUM('none', 'ai_assisted_internal', 'ai_generated_text', 'ai_generated_audio', 'ai_generated_video', 'synthetic_voice', 'synthetic_likeness');
  CREATE TYPE "public"."enum_media_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_sources_source_type" AS ENUM('book', 'journal_article', 'news_article', 'web_article', 'private_interview', 'archival_document', 'online_video', 'government_record', 'letter', 'document_scan', 'dataset', 'other');
  CREATE TYPE "public"."enum_sources_media_type" AS ENUM('text', 'audio', 'video', 'image', 'pdf', 'mixed');
  CREATE TYPE "public"."enum_sources_rights_status" AS ENUM('owned', 'licensed', 'public_domain', 'permission_granted', 'permission_pending', 'restricted', 'unknown');
  CREATE TYPE "public"."enum_sources_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_sponsors_sponsor_type" AS ENUM('organization', 'foundation', 'individual', 'family', 'institution', 'campaign');
  CREATE TYPE "public"."enum_sponsors_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_topics_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_tags_tag_type" AS ENUM('general', 'era', 'theme', 'technical', 'editorial', 'rights', 'ai');
  CREATE TYPE "public"."enum_places_place_type" AS ENUM('city', 'region', 'country', 'institution', 'landmark', 'other');
  CREATE TYPE "public"."enum_people_person_type" AS ENUM('scholar', 'jurist', 'hadith_scholar', 'historian', 'scientist_physician', 'poet_litterateur', 'ruler_statesperson', 'institution_builder', 'early_community_figure', 'expert_contributor', 'interviewer', 'narrator', 'author', 'institutional_contact', 'other');
  CREATE TYPE "public"."enum_people_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_stories_format" AS ENUM('video', 'audio', 'text', 'image_document', 'expert_commentary', 'ai_generated_video');
  CREATE TYPE "public"."enum_stories_ai_disclosure" AS ENUM('none', 'ai_assisted_internal', 'ai_generated_text', 'ai_generated_audio', 'ai_generated_video', 'synthetic_voice', 'synthetic_likeness');
  CREATE TYPE "public"."enum_stories_rights_status" AS ENUM('owned', 'licensed', 'public_domain', 'permission_granted', 'permission_pending', 'restricted', 'unknown');
  CREATE TYPE "public"."enum_stories_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_articles_article_type" AS ENUM('historical_event', 'concept', 'movement', 'timeline', 'person_context', 'organization', 'policy', 'place', 'technical_milestone', 'other');
  CREATE TYPE "public"."enum_articles_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_expert_essays_author_dashboard_submission_source" AS ENUM('email', 'word_document', 'pdf', 'direct_entry', 'other');
  CREATE TYPE "public"."enum_expert_essays_author_dashboard_submission_status" AS ENUM('uploaded', 'extracted', 'editing', 'submitted_for_review', 'approved', 'rejected');
  CREATE TYPE "public"."enum_expert_essays_rights_status" AS ENUM('owned', 'licensed', 'public_domain', 'permission_granted', 'permission_pending', 'restricted', 'unknown');
  CREATE TYPE "public"."enum_expert_essays_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_pages_page_purpose" AS ENUM('landing', 'topic_landing', 'collection', 'campaign', 'about', 'press', 'custom');
  CREATE TYPE "public"."enum_pages_workflow_status" AS ENUM('draft', 'in_editorial_review', 'editor_approved', 'rights_review_required', 'rights_cleared', 'ready_to_publish', 'published', 'unpublished', 'archived');
  CREATE TYPE "public"."enum_contributor_applications_requested_role" AS ENUM('author', 'editor', 'subscriber');
  CREATE TYPE "public"."enum_contributor_applications_source_ownership" AS ENUM('original', 'licensed', 'public_domain', 'permission_granted', 'needs_review');
  CREATE TYPE "public"."enum_contributor_applications_status" AS ENUM('new', 'needs_follow_up', 'approved', 'rejected', 'converted_to_draft');
  CREATE TYPE "public"."enum_ai_jobs_job_type" AS ENUM('transcript', 'summary', 'tag_suggestion', 'qa_index', 'social_post', 'video_script', 'avatar_video', 'citation_check', 'other');
  CREATE TYPE "public"."enum_ai_jobs_status" AS ENUM('queued', 'running', 'needs_review', 'approved', 'rejected', 'failed');
  CREATE TYPE "public"."enum_social_accounts_platform" AS ENUM('linkedin', 'x');
  CREATE TYPE "public"."enum_social_accounts_connected_entity_type" AS ENUM('company_page', 'organization', 'individual_account');
  CREATE TYPE "public"."enum_social_posts_platform_variants_platform" AS ENUM('linkedin', 'x');
  CREATE TYPE "public"."enum_social_posts_source_content_type" AS ENUM('story', 'article', 'person', 'custom');
  CREATE TYPE "public"."enum_social_posts_approval_status" AS ENUM('draft', 'in_review', 'approved', 'scheduled', 'published', 'failed', 'cancelled');
  CREATE TYPE "public"."enum_audit_logs_action" AS ENUM('create', 'update', 'publish', 'unpublish', 'delete');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'subscriber' NOT NULL,
  	"requested_public_role" "enum_users_requested_public_role",
  	"public_contributor_profile_approved_contributor" boolean DEFAULT false,
  	"public_contributor_profile_public_profile_enabled" boolean DEFAULT false,
  	"public_contributor_profile_biography" varchar,
  	"public_contributor_profile_expertise" varchar,
  	"public_contributor_profile_affiliation" varchar,
  	"public_contributor_profile_website_or_social" varchar,
  	"active" boolean DEFAULT true,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"topics_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"media_kind" "enum_media_media_kind" NOT NULL,
  	"alt_text" varchar,
  	"caption" varchar,
  	"credit_line" varchar,
  	"rights_status" "enum_media_rights_status" DEFAULT 'unknown' NOT NULL,
  	"license_name" varchar,
  	"license_url" varchar,
  	"source_url" varchar,
  	"expiry_date" timestamp(3) with time zone,
  	"usage_restrictions" varchar,
  	"public_delivery_allowed" boolean DEFAULT false,
  	"requires_watermark" boolean DEFAULT false,
  	"watermark_applied" boolean DEFAULT false,
  	"watermarked_file_note" varchar,
  	"ai_disclosure" "enum_media_ai_disclosure" DEFAULT 'none',
  	"workflow_status" "enum_media_workflow_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_public_url" varchar,
  	"sizes_public_width" numeric,
  	"sizes_public_height" numeric,
  	"sizes_public_mime_type" varchar,
  	"sizes_public_filesize" numeric,
  	"sizes_public_filename" varchar
  );
  
  CREATE TABLE "sources_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "sources" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_type" "enum_sources_source_type" NOT NULL,
  	"title" varchar,
  	"short_citation" varchar NOT NULL,
  	"full_citation" varchar NOT NULL,
  	"publication" varchar,
  	"publisher" varchar,
  	"publication_date_text" varchar,
  	"publication_date" timestamp(3) with time zone,
  	"pages" varchar,
  	"url" varchar,
  	"archive_url" varchar,
  	"accessed_date" timestamp(3) with time zone,
  	"media_type" "enum_sources_media_type",
  	"interview_details_interviewee" varchar,
  	"interview_details_interviewer" varchar,
  	"interview_details_location" varchar,
  	"interview_details_media_type" varchar,
  	"archival_details_institution" varchar,
  	"archival_details_collection_name" varchar,
  	"archival_details_box_or_folder" varchar,
  	"rights_status" "enum_sources_rights_status" DEFAULT 'unknown' NOT NULL,
  	"rights_notes" varchar,
  	"reliability_notes" varchar,
  	"attached_file_id" integer,
  	"workflow_status" "enum_sources_workflow_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sources_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"topics_id" integer
  );
  
  CREATE TABLE "sponsors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"sponsor_type" "enum_sponsors_sponsor_type" DEFAULT 'organization' NOT NULL,
  	"summary" varchar NOT NULL,
  	"website_url" varchar,
  	"logo_id" integer,
  	"public_credit_line" varchar,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_sponsors_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sponsors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"stories_id" integer,
  	"articles_id" integer,
  	"expert_essays_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "topics" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"parent_topic_id" integer,
  	"featured_image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_topics_workflow_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "topics_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"topics_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"tag_type" "enum_tags_tag_type" DEFAULT 'general' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "occupations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "places" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"place_type" "enum_places_place_type" NOT NULL,
  	"coordinates_latitude" numeric,
  	"coordinates_longitude" numeric,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "places_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sources_id" integer
  );
  
  CREATE TABLE "people_aliases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"alias" varchar NOT NULL
  );
  
  CREATE TABLE "people_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"display_title" varchar,
  	"person_type" "enum_people_person_type" DEFAULT 'scholar' NOT NULL,
  	"honorific_name" varchar,
  	"era_label" varchar,
  	"scholarly_tradition" varchar,
  	"primary_works" varchar,
  	"birth_date_text" varchar,
  	"birth_date" timestamp(3) with time zone,
  	"death_date_text" varchar,
  	"death_date" timestamp(3) with time zone,
  	"birth_place" varchar,
  	"nationality" varchar,
  	"short_bio" varchar NOT NULL,
  	"full_bio" jsonb,
  	"portrait_id" integer,
  	"portrait_credit_override" varchar,
  	"youtube_embed_id" varchar,
  	"external_video_url" varchar,
  	"external_video_source" varchar,
  	"external_video_note" varchar,
  	"sponsorship_primary_sponsor_id" integer,
  	"sponsorship_public_credit_line" varchar,
  	"sponsorship_show_sponsor_credit" boolean DEFAULT true,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"rights_cleared" boolean DEFAULT false,
  	"rights_cleared_by_id" integer,
  	"rights_cleared_at" timestamp(3) with time zone,
  	"rights_notes" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_people_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"occupations_id" integer,
  	"topics_id" integer,
  	"tags_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"sources_id" integer,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "stories_transcript_segments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"start_seconds" numeric,
  	"end_seconds" numeric,
  	"speaker" varchar,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"subtitle" varchar,
  	"format" "enum_stories_format" NOT NULL,
  	"primary_person_id" integer,
  	"story_order" numeric,
  	"summary" varchar NOT NULL,
  	"body" jsonb,
  	"video_asset_id" integer,
  	"youtube_embed_id" varchar,
  	"external_video_url" varchar,
  	"external_video_source" varchar,
  	"external_video_note" varchar,
  	"audio_asset_id" integer,
  	"thumbnail_id" integer,
  	"duration_seconds" numeric,
  	"transcript" jsonb,
  	"sponsorship_primary_sponsor_id" integer,
  	"sponsorship_public_credit_line" varchar,
  	"sponsorship_show_sponsor_credit" boolean DEFAULT true,
  	"credits" jsonb,
  	"ai_disclosure" "enum_stories_ai_disclosure" DEFAULT 'none',
  	"public_ai_label" varchar,
  	"rights_status" "enum_stories_rights_status" DEFAULT 'unknown' NOT NULL,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"rights_cleared" boolean DEFAULT false,
  	"rights_cleared_by_id" integer,
  	"rights_cleared_at" timestamp(3) with time zone,
  	"rights_notes" varchar,
  	"metrics_view_count" numeric DEFAULT 0,
  	"metrics_share_count" numeric DEFAULT 0,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_stories_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"articles_id" integer,
  	"media_id" integer,
  	"topics_id" integer,
  	"tags_id" integer,
  	"places_id" integer,
  	"sources_id" integer,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "articles_infobox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "articles_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL
  );
  
  CREATE TABLE "articles_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"image_id" integer,
  	"primary_link_label" varchar,
  	"primary_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_featured_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_featured_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_featured_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "articles_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"source_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_source_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles_blocks_related_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"article_type" "enum_articles_article_type" NOT NULL,
  	"lead_summary" varchar NOT NULL,
  	"table_of_contents_enabled" boolean DEFAULT true,
  	"sponsorship_primary_sponsor_id" integer,
  	"sponsorship_public_credit_line" varchar,
  	"sponsorship_show_sponsor_credit" boolean DEFAULT true,
  	"last_reviewed_at" timestamp(3) with time zone,
  	"reviewed_by_id" integer,
  	"expert_reviewed_by_id" integer,
  	"revision_summary" varchar,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"rights_cleared" boolean DEFAULT false,
  	"rights_cleared_by_id" integer,
  	"rights_cleared_at" timestamp(3) with time zone,
  	"rights_notes" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_articles_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sources_id" integer,
  	"people_id" integer,
  	"stories_id" integer,
  	"articles_id" integer,
  	"media_id" integer,
  	"topics_id" integer,
  	"places_id" integer,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "expert_essays_pull_quotes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL
  );
  
  CREATE TABLE "expert_essays" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"expert_id" integer NOT NULL,
  	"expert_title" varchar,
  	"required_credit_line" varchar NOT NULL,
  	"author_dashboard_source_document_id" integer,
  	"author_dashboard_submission_source" "enum_expert_essays_author_dashboard_submission_source",
  	"author_dashboard_submission_received_at" timestamp(3) with time zone,
  	"author_dashboard_extracted_text" varchar,
  	"author_dashboard_editable_draft" jsonb,
  	"author_dashboard_submission_status" "enum_expert_essays_author_dashboard_submission_status" DEFAULT 'uploaded',
  	"body" jsonb NOT NULL,
  	"sponsorship_primary_sponsor_id" integer,
  	"sponsorship_public_credit_line" varchar,
  	"sponsorship_show_sponsor_credit" boolean DEFAULT true,
  	"rights_status" "enum_expert_essays_rights_status" DEFAULT 'unknown' NOT NULL,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"rights_cleared" boolean DEFAULT false,
  	"rights_cleared_by_id" integer,
  	"rights_cleared_at" timestamp(3) with time zone,
  	"rights_notes" varchar,
  	"expert_approved" boolean DEFAULT false,
  	"expert_approved_at" timestamp(3) with time zone,
  	"expert_approved_by_editor_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_expert_essays_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "expert_essays_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sources_id" integer,
  	"people_id" integer,
  	"stories_id" integer,
  	"articles_id" integer,
  	"topics_id" integer,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"image_id" integer,
  	"primary_link_label" varchar,
  	"primary_link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_featured_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_label" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"attribution" varchar,
  	"source_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_source_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"page_purpose" "enum_pages_page_purpose" NOT NULL,
  	"sponsorship_primary_sponsor_id" integer,
  	"sponsorship_public_credit_line" varchar,
  	"sponsorship_show_sponsor_credit" boolean DEFAULT true,
  	"editor_approved" boolean DEFAULT false,
  	"editor_approved_by_id" integer,
  	"editor_approved_at" timestamp(3) with time zone,
  	"rights_cleared" boolean DEFAULT false,
  	"rights_cleared_by_id" integer,
  	"rights_cleared_at" timestamp(3) with time zone,
  	"rights_notes" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_canonical_url" varchar,
  	"workflow_status" "enum_pages_workflow_status" DEFAULT 'draft' NOT NULL,
  	"editorial_notes" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"stories_id" integer,
  	"articles_id" integer,
  	"sources_id" integer,
  	"media_id" integer,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "contributor_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"requested_role" "enum_contributor_applications_requested_role" DEFAULT 'author' NOT NULL,
  	"biography" varchar,
  	"expertise" varchar,
  	"affiliation" varchar,
  	"website_or_social" varchar,
  	"proposed_topic" varchar,
  	"article_summary" varchar,
  	"source_ownership" "enum_contributor_applications_source_ownership" DEFAULT 'original',
  	"created_user_id" integer,
  	"status" "enum_contributor_applications_status" DEFAULT 'new' NOT NULL,
  	"internal_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "ai_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"job_type" "enum_ai_jobs_job_type" NOT NULL,
  	"input_collection" varchar,
  	"input_document_id" varchar,
  	"prompt_summary" varchar,
  	"output_draft" varchar,
  	"provider" varchar,
  	"model" varchar,
  	"status" "enum_ai_jobs_status" DEFAULT 'queued' NOT NULL,
  	"reviewed_by_id" integer,
  	"reviewed_at" timestamp(3) with time zone,
  	"cost_estimate" numeric,
  	"error_log" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "social_accounts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum_social_accounts_platform" NOT NULL,
  	"display_name" varchar NOT NULL,
  	"connected_entity_type" "enum_social_accounts_connected_entity_type" NOT NULL,
  	"external_account_id" varchar,
  	"token_reference" varchar,
  	"token_expires_at" timestamp(3) with time zone,
  	"connected_by_id" integer,
  	"active" boolean DEFAULT true,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "social_posts_platform_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_social_posts_platform_variants_platform" NOT NULL,
  	"post_text" varchar NOT NULL,
  	"link" varchar,
  	"hashtags" varchar
  );
  
  CREATE TABLE "social_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"source_content_type" "enum_social_posts_source_content_type" DEFAULT 'custom',
  	"source_story_id" integer,
  	"source_article_id" integer,
  	"source_person_id" integer,
  	"approval_status" "enum_social_posts_approval_status" DEFAULT 'draft' NOT NULL,
  	"scheduled_for" timestamp(3) with time zone,
  	"approved_by_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"remote_post_ids" jsonb,
  	"error_log" varchar,
  	"analytics_snapshot" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "social_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"social_accounts_id" integer
  );
  
  CREATE TABLE "audit_logs_changed_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"before_value" varchar,
  	"after_value" varchar
  );
  
  CREATE TABLE "audit_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"action" "enum_audit_logs_action" NOT NULL,
  	"collection_slug" varchar NOT NULL,
  	"document_id" varchar NOT NULL,
  	"document_title" varchar NOT NULL,
  	"changed_by_id" integer,
  	"changed_by_email" varchar NOT NULL,
  	"changed_at" timestamp(3) with time zone NOT NULL,
  	"published_by_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"summary" varchar,
  	"before_snapshot" varchar,
  	"after_snapshot" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"sources_id" integer,
  	"sponsors_id" integer,
  	"topics_id" integer,
  	"tags_id" integer,
  	"occupations_id" integer,
  	"places_id" integer,
  	"people_id" integer,
  	"stories_id" integer,
  	"articles_id" integer,
  	"expert_essays_id" integer,
  	"pages_id" integer,
  	"contributor_applications_id" integer,
  	"ai_jobs_id" integer,
  	"social_accounts_id" integer,
  	"social_posts_id" integer,
  	"audit_logs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sources_authors" ADD CONSTRAINT "sources_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sources" ADD CONSTRAINT "sources_attached_file_id_media_id_fk" FOREIGN KEY ("attached_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sources_rels" ADD CONSTRAINT "sources_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sources_rels" ADD CONSTRAINT "sources_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sources_rels" ADD CONSTRAINT "sources_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_expert_essays_fk" FOREIGN KEY ("expert_essays_id") REFERENCES "public"."expert_essays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "topics" ADD CONSTRAINT "topics_parent_topic_id_topics_id_fk" FOREIGN KEY ("parent_topic_id") REFERENCES "public"."topics"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "topics" ADD CONSTRAINT "topics_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "topics" ADD CONSTRAINT "topics_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "topics_rels" ADD CONSTRAINT "topics_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "topics_rels" ADD CONSTRAINT "topics_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_aliases" ADD CONSTRAINT "people_aliases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_timeline_events" ADD CONSTRAINT "people_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_sponsorship_primary_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsorship_primary_sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_rights_cleared_by_id_users_id_fk" FOREIGN KEY ("rights_cleared_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_occupations_fk" FOREIGN KEY ("occupations_id") REFERENCES "public"."occupations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_transcript_segments" ADD CONSTRAINT "stories_transcript_segments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_primary_person_id_people_id_fk" FOREIGN KEY ("primary_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_video_asset_id_media_id_fk" FOREIGN KEY ("video_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_audio_asset_id_media_id_fk" FOREIGN KEY ("audio_asset_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_sponsorship_primary_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsorship_primary_sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_rights_cleared_by_id_users_id_fk" FOREIGN KEY ("rights_cleared_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_infobox" ADD CONSTRAINT "articles_infobox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_sections" ADD CONSTRAINT "articles_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero" ADD CONSTRAINT "articles_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_hero" ADD CONSTRAINT "articles_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_rich_text" ADD CONSTRAINT "articles_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_people" ADD CONSTRAINT "articles_blocks_featured_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_stories" ADD CONSTRAINT "articles_blocks_featured_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_featured_articles" ADD CONSTRAINT "articles_blocks_featured_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_timeline_events" ADD CONSTRAINT "articles_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_timeline" ADD CONSTRAINT "articles_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_quote" ADD CONSTRAINT "articles_blocks_quote_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_blocks_quote" ADD CONSTRAINT "articles_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_source_table" ADD CONSTRAINT "articles_blocks_source_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_media_gallery" ADD CONSTRAINT "articles_blocks_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_blocks_related_content" ADD CONSTRAINT "articles_blocks_related_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_sponsorship_primary_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsorship_primary_sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_expert_reviewed_by_id_people_id_fk" FOREIGN KEY ("expert_reviewed_by_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_rights_cleared_by_id_users_id_fk" FOREIGN KEY ("rights_cleared_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_pull_quotes" ADD CONSTRAINT "expert_essays_pull_quotes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expert_essays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_expert_id_people_id_fk" FOREIGN KEY ("expert_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_author_dashboard_source_document_id_media_id_fk" FOREIGN KEY ("author_dashboard_source_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_sponsorship_primary_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsorship_primary_sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_rights_cleared_by_id_users_id_fk" FOREIGN KEY ("rights_cleared_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_expert_approved_by_editor_id_users_id_fk" FOREIGN KEY ("expert_approved_by_editor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays" ADD CONSTRAINT "expert_essays_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."expert_essays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expert_essays_rels" ADD CONSTRAINT "expert_essays_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_people" ADD CONSTRAINT "pages_blocks_featured_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_stories" ADD CONSTRAINT "pages_blocks_featured_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_featured_articles" ADD CONSTRAINT "pages_blocks_featured_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_source_table" ADD CONSTRAINT "pages_blocks_source_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_gallery" ADD CONSTRAINT "pages_blocks_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_content" ADD CONSTRAINT "pages_blocks_related_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_sponsorship_primary_sponsor_id_sponsors_id_fk" FOREIGN KEY ("sponsorship_primary_sponsor_id") REFERENCES "public"."sponsors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_editor_approved_by_id_users_id_fk" FOREIGN KEY ("editor_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_rights_cleared_by_id_users_id_fk" FOREIGN KEY ("rights_cleared_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contributor_applications" ADD CONSTRAINT "contributor_applications_created_user_id_users_id_fk" FOREIGN KEY ("created_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ai_jobs" ADD CONSTRAINT "ai_jobs_reviewed_by_id_users_id_fk" FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_accounts" ADD CONSTRAINT "social_accounts_connected_by_id_users_id_fk" FOREIGN KEY ("connected_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_posts_platform_variants" ADD CONSTRAINT "social_posts_platform_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."social_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_source_story_id_stories_id_fk" FOREIGN KEY ("source_story_id") REFERENCES "public"."stories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_source_article_id_articles_id_fk" FOREIGN KEY ("source_article_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_source_person_id_people_id_fk" FOREIGN KEY ("source_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_posts" ADD CONSTRAINT "social_posts_approved_by_id_users_id_fk" FOREIGN KEY ("approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "social_posts_rels" ADD CONSTRAINT "social_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."social_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_posts_rels" ADD CONSTRAINT "social_posts_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "social_posts_rels" ADD CONSTRAINT "social_posts_rels_social_accounts_fk" FOREIGN KEY ("social_accounts_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs_changed_fields" ADD CONSTRAINT "audit_logs_changed_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_changed_by_id_users_id_fk" FOREIGN KEY ("changed_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_published_by_id_users_id_fk" FOREIGN KEY ("published_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sources_fk" FOREIGN KEY ("sources_id") REFERENCES "public"."sources"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_topics_fk" FOREIGN KEY ("topics_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_occupations_fk" FOREIGN KEY ("occupations_id") REFERENCES "public"."occupations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_expert_essays_fk" FOREIGN KEY ("expert_essays_id") REFERENCES "public"."expert_essays"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contributor_applications_fk" FOREIGN KEY ("contributor_applications_id") REFERENCES "public"."contributor_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ai_jobs_fk" FOREIGN KEY ("ai_jobs_id") REFERENCES "public"."ai_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_accounts_fk" FOREIGN KEY ("social_accounts_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_posts_fk" FOREIGN KEY ("social_posts_id") REFERENCES "public"."social_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY ("audit_logs_id") REFERENCES "public"."audit_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX "users_rels_topics_id_idx" ON "users_rels" USING btree ("topics_id");
  CREATE INDEX "media_workflow_status_idx" ON "media" USING btree ("workflow_status");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_public_sizes_public_filename_idx" ON "media" USING btree ("sizes_public_filename");
  CREATE INDEX "sources_authors_order_idx" ON "sources_authors" USING btree ("_order");
  CREATE INDEX "sources_authors_parent_id_idx" ON "sources_authors" USING btree ("_parent_id");
  CREATE INDEX "sources_attached_file_idx" ON "sources" USING btree ("attached_file_id");
  CREATE INDEX "sources_workflow_status_idx" ON "sources" USING btree ("workflow_status");
  CREATE INDEX "sources_updated_at_idx" ON "sources" USING btree ("updated_at");
  CREATE INDEX "sources_created_at_idx" ON "sources" USING btree ("created_at");
  CREATE INDEX "sources_rels_order_idx" ON "sources_rels" USING btree ("order");
  CREATE INDEX "sources_rels_parent_idx" ON "sources_rels" USING btree ("parent_id");
  CREATE INDEX "sources_rels_path_idx" ON "sources_rels" USING btree ("path");
  CREATE INDEX "sources_rels_people_id_idx" ON "sources_rels" USING btree ("people_id");
  CREATE INDEX "sources_rels_topics_id_idx" ON "sources_rels" USING btree ("topics_id");
  CREATE UNIQUE INDEX "sponsors_slug_idx" ON "sponsors" USING btree ("slug");
  CREATE INDEX "sponsors_logo_idx" ON "sponsors" USING btree ("logo_id");
  CREATE INDEX "sponsors_editor_approved_by_idx" ON "sponsors" USING btree ("editor_approved_by_id");
  CREATE INDEX "sponsors_seo_seo_image_idx" ON "sponsors" USING btree ("seo_image_id");
  CREATE INDEX "sponsors_workflow_status_idx" ON "sponsors" USING btree ("workflow_status");
  CREATE INDEX "sponsors_updated_at_idx" ON "sponsors" USING btree ("updated_at");
  CREATE INDEX "sponsors_created_at_idx" ON "sponsors" USING btree ("created_at");
  CREATE INDEX "sponsors_rels_order_idx" ON "sponsors_rels" USING btree ("order");
  CREATE INDEX "sponsors_rels_parent_idx" ON "sponsors_rels" USING btree ("parent_id");
  CREATE INDEX "sponsors_rels_path_idx" ON "sponsors_rels" USING btree ("path");
  CREATE INDEX "sponsors_rels_people_id_idx" ON "sponsors_rels" USING btree ("people_id");
  CREATE INDEX "sponsors_rels_stories_id_idx" ON "sponsors_rels" USING btree ("stories_id");
  CREATE INDEX "sponsors_rels_articles_id_idx" ON "sponsors_rels" USING btree ("articles_id");
  CREATE INDEX "sponsors_rels_expert_essays_id_idx" ON "sponsors_rels" USING btree ("expert_essays_id");
  CREATE INDEX "sponsors_rels_pages_id_idx" ON "sponsors_rels" USING btree ("pages_id");
  CREATE UNIQUE INDEX "topics_slug_idx" ON "topics" USING btree ("slug");
  CREATE INDEX "topics_parent_topic_idx" ON "topics" USING btree ("parent_topic_id");
  CREATE INDEX "topics_featured_image_idx" ON "topics" USING btree ("featured_image_id");
  CREATE INDEX "topics_seo_seo_image_idx" ON "topics" USING btree ("seo_image_id");
  CREATE INDEX "topics_workflow_status_idx" ON "topics" USING btree ("workflow_status");
  CREATE INDEX "topics_updated_at_idx" ON "topics" USING btree ("updated_at");
  CREATE INDEX "topics_created_at_idx" ON "topics" USING btree ("created_at");
  CREATE INDEX "topics_rels_order_idx" ON "topics_rels" USING btree ("order");
  CREATE INDEX "topics_rels_parent_idx" ON "topics_rels" USING btree ("parent_id");
  CREATE INDEX "topics_rels_path_idx" ON "topics_rels" USING btree ("path");
  CREATE INDEX "topics_rels_topics_id_idx" ON "topics_rels" USING btree ("topics_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "occupations_slug_idx" ON "occupations" USING btree ("slug");
  CREATE INDEX "occupations_updated_at_idx" ON "occupations" USING btree ("updated_at");
  CREATE INDEX "occupations_created_at_idx" ON "occupations" USING btree ("created_at");
  CREATE UNIQUE INDEX "places_slug_idx" ON "places" USING btree ("slug");
  CREATE INDEX "places_updated_at_idx" ON "places" USING btree ("updated_at");
  CREATE INDEX "places_created_at_idx" ON "places" USING btree ("created_at");
  CREATE INDEX "places_rels_order_idx" ON "places_rels" USING btree ("order");
  CREATE INDEX "places_rels_parent_idx" ON "places_rels" USING btree ("parent_id");
  CREATE INDEX "places_rels_path_idx" ON "places_rels" USING btree ("path");
  CREATE INDEX "places_rels_sources_id_idx" ON "places_rels" USING btree ("sources_id");
  CREATE INDEX "people_aliases_order_idx" ON "people_aliases" USING btree ("_order");
  CREATE INDEX "people_aliases_parent_id_idx" ON "people_aliases" USING btree ("_parent_id");
  CREATE INDEX "people_timeline_events_order_idx" ON "people_timeline_events" USING btree ("_order");
  CREATE INDEX "people_timeline_events_parent_id_idx" ON "people_timeline_events" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_portrait_idx" ON "people" USING btree ("portrait_id");
  CREATE INDEX "people_sponsorship_sponsorship_primary_sponsor_idx" ON "people" USING btree ("sponsorship_primary_sponsor_id");
  CREATE INDEX "people_editor_approved_by_idx" ON "people" USING btree ("editor_approved_by_id");
  CREATE INDEX "people_rights_cleared_by_idx" ON "people" USING btree ("rights_cleared_by_id");
  CREATE INDEX "people_seo_seo_image_idx" ON "people" USING btree ("seo_image_id");
  CREATE INDEX "people_workflow_status_idx" ON "people" USING btree ("workflow_status");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people_rels_order_idx" ON "people_rels" USING btree ("order");
  CREATE INDEX "people_rels_parent_idx" ON "people_rels" USING btree ("parent_id");
  CREATE INDEX "people_rels_path_idx" ON "people_rels" USING btree ("path");
  CREATE INDEX "people_rels_occupations_id_idx" ON "people_rels" USING btree ("occupations_id");
  CREATE INDEX "people_rels_topics_id_idx" ON "people_rels" USING btree ("topics_id");
  CREATE INDEX "people_rels_tags_id_idx" ON "people_rels" USING btree ("tags_id");
  CREATE INDEX "people_rels_people_id_idx" ON "people_rels" USING btree ("people_id");
  CREATE INDEX "people_rels_places_id_idx" ON "people_rels" USING btree ("places_id");
  CREATE INDEX "people_rels_sources_id_idx" ON "people_rels" USING btree ("sources_id");
  CREATE INDEX "people_rels_sponsors_id_idx" ON "people_rels" USING btree ("sponsors_id");
  CREATE INDEX "stories_transcript_segments_order_idx" ON "stories_transcript_segments" USING btree ("_order");
  CREATE INDEX "stories_transcript_segments_parent_id_idx" ON "stories_transcript_segments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_primary_person_idx" ON "stories" USING btree ("primary_person_id");
  CREATE INDEX "stories_video_asset_idx" ON "stories" USING btree ("video_asset_id");
  CREATE INDEX "stories_audio_asset_idx" ON "stories" USING btree ("audio_asset_id");
  CREATE INDEX "stories_thumbnail_idx" ON "stories" USING btree ("thumbnail_id");
  CREATE INDEX "stories_sponsorship_sponsorship_primary_sponsor_idx" ON "stories" USING btree ("sponsorship_primary_sponsor_id");
  CREATE INDEX "stories_editor_approved_by_idx" ON "stories" USING btree ("editor_approved_by_id");
  CREATE INDEX "stories_rights_cleared_by_idx" ON "stories" USING btree ("rights_cleared_by_id");
  CREATE INDEX "stories_seo_seo_image_idx" ON "stories" USING btree ("seo_image_id");
  CREATE INDEX "stories_workflow_status_idx" ON "stories" USING btree ("workflow_status");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE INDEX "stories_rels_order_idx" ON "stories_rels" USING btree ("order");
  CREATE INDEX "stories_rels_parent_idx" ON "stories_rels" USING btree ("parent_id");
  CREATE INDEX "stories_rels_path_idx" ON "stories_rels" USING btree ("path");
  CREATE INDEX "stories_rels_people_id_idx" ON "stories_rels" USING btree ("people_id");
  CREATE INDEX "stories_rels_articles_id_idx" ON "stories_rels" USING btree ("articles_id");
  CREATE INDEX "stories_rels_media_id_idx" ON "stories_rels" USING btree ("media_id");
  CREATE INDEX "stories_rels_topics_id_idx" ON "stories_rels" USING btree ("topics_id");
  CREATE INDEX "stories_rels_tags_id_idx" ON "stories_rels" USING btree ("tags_id");
  CREATE INDEX "stories_rels_places_id_idx" ON "stories_rels" USING btree ("places_id");
  CREATE INDEX "stories_rels_sources_id_idx" ON "stories_rels" USING btree ("sources_id");
  CREATE INDEX "stories_rels_sponsors_id_idx" ON "stories_rels" USING btree ("sponsors_id");
  CREATE INDEX "articles_infobox_order_idx" ON "articles_infobox" USING btree ("_order");
  CREATE INDEX "articles_infobox_parent_id_idx" ON "articles_infobox" USING btree ("_parent_id");
  CREATE INDEX "articles_sections_order_idx" ON "articles_sections" USING btree ("_order");
  CREATE INDEX "articles_sections_parent_id_idx" ON "articles_sections" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_order_idx" ON "articles_blocks_hero" USING btree ("_order");
  CREATE INDEX "articles_blocks_hero_parent_id_idx" ON "articles_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_hero_path_idx" ON "articles_blocks_hero" USING btree ("_path");
  CREATE INDEX "articles_blocks_hero_image_idx" ON "articles_blocks_hero" USING btree ("image_id");
  CREATE INDEX "articles_blocks_rich_text_order_idx" ON "articles_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "articles_blocks_rich_text_parent_id_idx" ON "articles_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_rich_text_path_idx" ON "articles_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "articles_blocks_featured_people_order_idx" ON "articles_blocks_featured_people" USING btree ("_order");
  CREATE INDEX "articles_blocks_featured_people_parent_id_idx" ON "articles_blocks_featured_people" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_featured_people_path_idx" ON "articles_blocks_featured_people" USING btree ("_path");
  CREATE INDEX "articles_blocks_featured_stories_order_idx" ON "articles_blocks_featured_stories" USING btree ("_order");
  CREATE INDEX "articles_blocks_featured_stories_parent_id_idx" ON "articles_blocks_featured_stories" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_featured_stories_path_idx" ON "articles_blocks_featured_stories" USING btree ("_path");
  CREATE INDEX "articles_blocks_featured_articles_order_idx" ON "articles_blocks_featured_articles" USING btree ("_order");
  CREATE INDEX "articles_blocks_featured_articles_parent_id_idx" ON "articles_blocks_featured_articles" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_featured_articles_path_idx" ON "articles_blocks_featured_articles" USING btree ("_path");
  CREATE INDEX "articles_blocks_timeline_events_order_idx" ON "articles_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "articles_blocks_timeline_events_parent_id_idx" ON "articles_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_timeline_order_idx" ON "articles_blocks_timeline" USING btree ("_order");
  CREATE INDEX "articles_blocks_timeline_parent_id_idx" ON "articles_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_timeline_path_idx" ON "articles_blocks_timeline" USING btree ("_path");
  CREATE INDEX "articles_blocks_quote_order_idx" ON "articles_blocks_quote" USING btree ("_order");
  CREATE INDEX "articles_blocks_quote_parent_id_idx" ON "articles_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_quote_path_idx" ON "articles_blocks_quote" USING btree ("_path");
  CREATE INDEX "articles_blocks_quote_source_idx" ON "articles_blocks_quote" USING btree ("source_id");
  CREATE INDEX "articles_blocks_source_table_order_idx" ON "articles_blocks_source_table" USING btree ("_order");
  CREATE INDEX "articles_blocks_source_table_parent_id_idx" ON "articles_blocks_source_table" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_source_table_path_idx" ON "articles_blocks_source_table" USING btree ("_path");
  CREATE INDEX "articles_blocks_media_gallery_order_idx" ON "articles_blocks_media_gallery" USING btree ("_order");
  CREATE INDEX "articles_blocks_media_gallery_parent_id_idx" ON "articles_blocks_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_media_gallery_path_idx" ON "articles_blocks_media_gallery" USING btree ("_path");
  CREATE INDEX "articles_blocks_related_content_order_idx" ON "articles_blocks_related_content" USING btree ("_order");
  CREATE INDEX "articles_blocks_related_content_parent_id_idx" ON "articles_blocks_related_content" USING btree ("_parent_id");
  CREATE INDEX "articles_blocks_related_content_path_idx" ON "articles_blocks_related_content" USING btree ("_path");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_sponsorship_sponsorship_primary_sponsor_idx" ON "articles" USING btree ("sponsorship_primary_sponsor_id");
  CREATE INDEX "articles_reviewed_by_idx" ON "articles" USING btree ("reviewed_by_id");
  CREATE INDEX "articles_expert_reviewed_by_idx" ON "articles" USING btree ("expert_reviewed_by_id");
  CREATE INDEX "articles_editor_approved_by_idx" ON "articles" USING btree ("editor_approved_by_id");
  CREATE INDEX "articles_rights_cleared_by_idx" ON "articles" USING btree ("rights_cleared_by_id");
  CREATE INDEX "articles_seo_seo_image_idx" ON "articles" USING btree ("seo_image_id");
  CREATE INDEX "articles_workflow_status_idx" ON "articles" USING btree ("workflow_status");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_sources_id_idx" ON "articles_rels" USING btree ("sources_id");
  CREATE INDEX "articles_rels_people_id_idx" ON "articles_rels" USING btree ("people_id");
  CREATE INDEX "articles_rels_stories_id_idx" ON "articles_rels" USING btree ("stories_id");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_media_id_idx" ON "articles_rels" USING btree ("media_id");
  CREATE INDEX "articles_rels_topics_id_idx" ON "articles_rels" USING btree ("topics_id");
  CREATE INDEX "articles_rels_places_id_idx" ON "articles_rels" USING btree ("places_id");
  CREATE INDEX "articles_rels_sponsors_id_idx" ON "articles_rels" USING btree ("sponsors_id");
  CREATE INDEX "expert_essays_pull_quotes_order_idx" ON "expert_essays_pull_quotes" USING btree ("_order");
  CREATE INDEX "expert_essays_pull_quotes_parent_id_idx" ON "expert_essays_pull_quotes" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "expert_essays_slug_idx" ON "expert_essays" USING btree ("slug");
  CREATE INDEX "expert_essays_expert_idx" ON "expert_essays" USING btree ("expert_id");
  CREATE INDEX "expert_essays_author_dashboard_author_dashboard_source_d_idx" ON "expert_essays" USING btree ("author_dashboard_source_document_id");
  CREATE INDEX "expert_essays_sponsorship_sponsorship_primary_sponsor_idx" ON "expert_essays" USING btree ("sponsorship_primary_sponsor_id");
  CREATE INDEX "expert_essays_editor_approved_by_idx" ON "expert_essays" USING btree ("editor_approved_by_id");
  CREATE INDEX "expert_essays_rights_cleared_by_idx" ON "expert_essays" USING btree ("rights_cleared_by_id");
  CREATE INDEX "expert_essays_expert_approved_by_editor_idx" ON "expert_essays" USING btree ("expert_approved_by_editor_id");
  CREATE INDEX "expert_essays_seo_seo_image_idx" ON "expert_essays" USING btree ("seo_image_id");
  CREATE INDEX "expert_essays_workflow_status_idx" ON "expert_essays" USING btree ("workflow_status");
  CREATE INDEX "expert_essays_updated_at_idx" ON "expert_essays" USING btree ("updated_at");
  CREATE INDEX "expert_essays_created_at_idx" ON "expert_essays" USING btree ("created_at");
  CREATE INDEX "expert_essays_rels_order_idx" ON "expert_essays_rels" USING btree ("order");
  CREATE INDEX "expert_essays_rels_parent_idx" ON "expert_essays_rels" USING btree ("parent_id");
  CREATE INDEX "expert_essays_rels_path_idx" ON "expert_essays_rels" USING btree ("path");
  CREATE INDEX "expert_essays_rels_sources_id_idx" ON "expert_essays_rels" USING btree ("sources_id");
  CREATE INDEX "expert_essays_rels_people_id_idx" ON "expert_essays_rels" USING btree ("people_id");
  CREATE INDEX "expert_essays_rels_stories_id_idx" ON "expert_essays_rels" USING btree ("stories_id");
  CREATE INDEX "expert_essays_rels_articles_id_idx" ON "expert_essays_rels" USING btree ("articles_id");
  CREATE INDEX "expert_essays_rels_topics_id_idx" ON "expert_essays_rels" USING btree ("topics_id");
  CREATE INDEX "expert_essays_rels_sponsors_id_idx" ON "expert_essays_rels" USING btree ("sponsors_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_people_order_idx" ON "pages_blocks_featured_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_people_parent_id_idx" ON "pages_blocks_featured_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_people_path_idx" ON "pages_blocks_featured_people" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_stories_order_idx" ON "pages_blocks_featured_stories" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_stories_parent_id_idx" ON "pages_blocks_featured_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_stories_path_idx" ON "pages_blocks_featured_stories" USING btree ("_path");
  CREATE INDEX "pages_blocks_featured_articles_order_idx" ON "pages_blocks_featured_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_featured_articles_parent_id_idx" ON "pages_blocks_featured_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_featured_articles_path_idx" ON "pages_blocks_featured_articles" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_events_order_idx" ON "pages_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_events_parent_id_idx" ON "pages_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_source_idx" ON "pages_blocks_quote" USING btree ("source_id");
  CREATE INDEX "pages_blocks_source_table_order_idx" ON "pages_blocks_source_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_source_table_parent_id_idx" ON "pages_blocks_source_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_source_table_path_idx" ON "pages_blocks_source_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_gallery_order_idx" ON "pages_blocks_media_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_gallery_parent_id_idx" ON "pages_blocks_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_gallery_path_idx" ON "pages_blocks_media_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_related_content_order_idx" ON "pages_blocks_related_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_content_parent_id_idx" ON "pages_blocks_related_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_content_path_idx" ON "pages_blocks_related_content" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_sponsorship_sponsorship_primary_sponsor_idx" ON "pages" USING btree ("sponsorship_primary_sponsor_id");
  CREATE INDEX "pages_editor_approved_by_idx" ON "pages" USING btree ("editor_approved_by_id");
  CREATE INDEX "pages_rights_cleared_by_idx" ON "pages" USING btree ("rights_cleared_by_id");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages" USING btree ("seo_image_id");
  CREATE INDEX "pages_workflow_status_idx" ON "pages" USING btree ("workflow_status");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id");
  CREATE INDEX "pages_rels_stories_id_idx" ON "pages_rels" USING btree ("stories_id");
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "pages_rels_sources_id_idx" ON "pages_rels" USING btree ("sources_id");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "pages_rels_sponsors_id_idx" ON "pages_rels" USING btree ("sponsors_id");
  CREATE INDEX "contributor_applications_created_user_idx" ON "contributor_applications" USING btree ("created_user_id");
  CREATE INDEX "contributor_applications_updated_at_idx" ON "contributor_applications" USING btree ("updated_at");
  CREATE INDEX "contributor_applications_created_at_idx" ON "contributor_applications" USING btree ("created_at");
  CREATE INDEX "ai_jobs_reviewed_by_idx" ON "ai_jobs" USING btree ("reviewed_by_id");
  CREATE INDEX "ai_jobs_updated_at_idx" ON "ai_jobs" USING btree ("updated_at");
  CREATE INDEX "ai_jobs_created_at_idx" ON "ai_jobs" USING btree ("created_at");
  CREATE INDEX "social_accounts_connected_by_idx" ON "social_accounts" USING btree ("connected_by_id");
  CREATE INDEX "social_accounts_updated_at_idx" ON "social_accounts" USING btree ("updated_at");
  CREATE INDEX "social_accounts_created_at_idx" ON "social_accounts" USING btree ("created_at");
  CREATE INDEX "social_posts_platform_variants_order_idx" ON "social_posts_platform_variants" USING btree ("_order");
  CREATE INDEX "social_posts_platform_variants_parent_id_idx" ON "social_posts_platform_variants" USING btree ("_parent_id");
  CREATE INDEX "social_posts_source_story_idx" ON "social_posts" USING btree ("source_story_id");
  CREATE INDEX "social_posts_source_article_idx" ON "social_posts" USING btree ("source_article_id");
  CREATE INDEX "social_posts_source_person_idx" ON "social_posts" USING btree ("source_person_id");
  CREATE INDEX "social_posts_approved_by_idx" ON "social_posts" USING btree ("approved_by_id");
  CREATE INDEX "social_posts_updated_at_idx" ON "social_posts" USING btree ("updated_at");
  CREATE INDEX "social_posts_created_at_idx" ON "social_posts" USING btree ("created_at");
  CREATE INDEX "social_posts_rels_order_idx" ON "social_posts_rels" USING btree ("order");
  CREATE INDEX "social_posts_rels_parent_idx" ON "social_posts_rels" USING btree ("parent_id");
  CREATE INDEX "social_posts_rels_path_idx" ON "social_posts_rels" USING btree ("path");
  CREATE INDEX "social_posts_rels_media_id_idx" ON "social_posts_rels" USING btree ("media_id");
  CREATE INDEX "social_posts_rels_social_accounts_id_idx" ON "social_posts_rels" USING btree ("social_accounts_id");
  CREATE INDEX "audit_logs_changed_fields_order_idx" ON "audit_logs_changed_fields" USING btree ("_order");
  CREATE INDEX "audit_logs_changed_fields_parent_id_idx" ON "audit_logs_changed_fields" USING btree ("_parent_id");
  CREATE INDEX "audit_logs_changed_by_idx" ON "audit_logs" USING btree ("changed_by_id");
  CREATE INDEX "audit_logs_published_by_idx" ON "audit_logs" USING btree ("published_by_id");
  CREATE INDEX "audit_logs_updated_at_idx" ON "audit_logs" USING btree ("updated_at");
  CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_sources_id_idx" ON "payload_locked_documents_rels" USING btree ("sources_id");
  CREATE INDEX "payload_locked_documents_rels_sponsors_id_idx" ON "payload_locked_documents_rels" USING btree ("sponsors_id");
  CREATE INDEX "payload_locked_documents_rels_topics_id_idx" ON "payload_locked_documents_rels" USING btree ("topics_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_occupations_id_idx" ON "payload_locked_documents_rels" USING btree ("occupations_id");
  CREATE INDEX "payload_locked_documents_rels_places_id_idx" ON "payload_locked_documents_rels" USING btree ("places_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_expert_essays_id_idx" ON "payload_locked_documents_rels" USING btree ("expert_essays_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_contributor_applications_i_idx" ON "payload_locked_documents_rels" USING btree ("contributor_applications_id");
  CREATE INDEX "payload_locked_documents_rels_ai_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("ai_jobs_id");
  CREATE INDEX "payload_locked_documents_rels_social_accounts_id_idx" ON "payload_locked_documents_rels" USING btree ("social_accounts_id");
  CREATE INDEX "payload_locked_documents_rels_social_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("social_posts_id");
  CREATE INDEX "payload_locked_documents_rels_audit_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_logs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "sources_authors" CASCADE;
  DROP TABLE "sources" CASCADE;
  DROP TABLE "sources_rels" CASCADE;
  DROP TABLE "sponsors" CASCADE;
  DROP TABLE "sponsors_rels" CASCADE;
  DROP TABLE "topics" CASCADE;
  DROP TABLE "topics_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "occupations" CASCADE;
  DROP TABLE "places" CASCADE;
  DROP TABLE "places_rels" CASCADE;
  DROP TABLE "people_aliases" CASCADE;
  DROP TABLE "people_timeline_events" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_rels" CASCADE;
  DROP TABLE "stories_transcript_segments" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_rels" CASCADE;
  DROP TABLE "articles_infobox" CASCADE;
  DROP TABLE "articles_sections" CASCADE;
  DROP TABLE "articles_blocks_hero" CASCADE;
  DROP TABLE "articles_blocks_rich_text" CASCADE;
  DROP TABLE "articles_blocks_featured_people" CASCADE;
  DROP TABLE "articles_blocks_featured_stories" CASCADE;
  DROP TABLE "articles_blocks_featured_articles" CASCADE;
  DROP TABLE "articles_blocks_timeline_events" CASCADE;
  DROP TABLE "articles_blocks_timeline" CASCADE;
  DROP TABLE "articles_blocks_quote" CASCADE;
  DROP TABLE "articles_blocks_source_table" CASCADE;
  DROP TABLE "articles_blocks_media_gallery" CASCADE;
  DROP TABLE "articles_blocks_related_content" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "expert_essays_pull_quotes" CASCADE;
  DROP TABLE "expert_essays" CASCADE;
  DROP TABLE "expert_essays_rels" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_featured_people" CASCADE;
  DROP TABLE "pages_blocks_featured_stories" CASCADE;
  DROP TABLE "pages_blocks_featured_articles" CASCADE;
  DROP TABLE "pages_blocks_timeline_events" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_source_table" CASCADE;
  DROP TABLE "pages_blocks_media_gallery" CASCADE;
  DROP TABLE "pages_blocks_related_content" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "contributor_applications" CASCADE;
  DROP TABLE "ai_jobs" CASCADE;
  DROP TABLE "social_accounts" CASCADE;
  DROP TABLE "social_posts_platform_variants" CASCADE;
  DROP TABLE "social_posts" CASCADE;
  DROP TABLE "social_posts_rels" CASCADE;
  DROP TABLE "audit_logs_changed_fields" CASCADE;
  DROP TABLE "audit_logs" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_users_requested_public_role";
  DROP TYPE "public"."enum_media_media_kind";
  DROP TYPE "public"."enum_media_rights_status";
  DROP TYPE "public"."enum_media_ai_disclosure";
  DROP TYPE "public"."enum_media_workflow_status";
  DROP TYPE "public"."enum_sources_source_type";
  DROP TYPE "public"."enum_sources_media_type";
  DROP TYPE "public"."enum_sources_rights_status";
  DROP TYPE "public"."enum_sources_workflow_status";
  DROP TYPE "public"."enum_sponsors_sponsor_type";
  DROP TYPE "public"."enum_sponsors_workflow_status";
  DROP TYPE "public"."enum_topics_workflow_status";
  DROP TYPE "public"."enum_tags_tag_type";
  DROP TYPE "public"."enum_places_place_type";
  DROP TYPE "public"."enum_people_person_type";
  DROP TYPE "public"."enum_people_workflow_status";
  DROP TYPE "public"."enum_stories_format";
  DROP TYPE "public"."enum_stories_ai_disclosure";
  DROP TYPE "public"."enum_stories_rights_status";
  DROP TYPE "public"."enum_stories_workflow_status";
  DROP TYPE "public"."enum_articles_article_type";
  DROP TYPE "public"."enum_articles_workflow_status";
  DROP TYPE "public"."enum_expert_essays_author_dashboard_submission_source";
  DROP TYPE "public"."enum_expert_essays_author_dashboard_submission_status";
  DROP TYPE "public"."enum_expert_essays_rights_status";
  DROP TYPE "public"."enum_expert_essays_workflow_status";
  DROP TYPE "public"."enum_pages_page_purpose";
  DROP TYPE "public"."enum_pages_workflow_status";
  DROP TYPE "public"."enum_contributor_applications_requested_role";
  DROP TYPE "public"."enum_contributor_applications_source_ownership";
  DROP TYPE "public"."enum_contributor_applications_status";
  DROP TYPE "public"."enum_ai_jobs_job_type";
  DROP TYPE "public"."enum_ai_jobs_status";
  DROP TYPE "public"."enum_social_accounts_platform";
  DROP TYPE "public"."enum_social_accounts_connected_entity_type";
  DROP TYPE "public"."enum_social_posts_platform_variants_platform";
  DROP TYPE "public"."enum_social_posts_source_content_type";
  DROP TYPE "public"."enum_social_posts_approval_status";
  DROP TYPE "public"."enum_audit_logs_action";`)
}
