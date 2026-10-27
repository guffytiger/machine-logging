CREATE TYPE "public"."user_role" AS ENUM('Admin', 'Staff', 'OPR');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'OPR' NOT NULL;