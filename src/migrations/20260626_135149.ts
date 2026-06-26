import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_projects_category" ADD VALUE IF NOT EXISTS 'outil-interne';
    ALTER TYPE "public"."enum__projects_v_version_category" ADD VALUE IF NOT EXISTS 'outil-interne';
  `)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_projects_badge" AS ENUM('acces-anticipe');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__projects_v_version_badge" AS ENUM('acces-anticipe');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;

    ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "badge" "enum_projects_badge";
    ALTER TABLE "_projects_v" ADD COLUMN IF NOT EXISTS "version_badge" "enum__projects_v_version_badge";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "projects" DROP COLUMN IF EXISTS "badge";
    ALTER TABLE "_projects_v" DROP COLUMN IF EXISTS "version_badge";
    DROP TYPE IF EXISTS "public"."enum_projects_badge";
    DROP TYPE IF EXISTS "public"."enum__projects_v_version_badge";
  `)
}
