import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "chat_leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"project_type" varchar NOT NULL,
  	"offer_title" varchar NOT NULL,
  	"tier_name" varchar NOT NULL,
  	"budget" varchar NOT NULL,
  	"delay" varchar NOT NULL,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "chat_leads_id" integer;
  CREATE INDEX "chat_leads_updated_at_idx" ON "chat_leads" USING btree ("updated_at");
  CREATE INDEX "chat_leads_created_at_idx" ON "chat_leads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_chat_leads_fk" FOREIGN KEY ("chat_leads_id") REFERENCES "public"."chat_leads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_chat_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("chat_leads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "chat_leads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "chat_leads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_chat_leads_fk";
  
  DROP INDEX "payload_locked_documents_rels_chat_leads_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "chat_leads_id";`)
}
