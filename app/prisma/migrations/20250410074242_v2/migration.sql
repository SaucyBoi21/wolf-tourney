-- AlterTable
ALTER TABLE "Tournament" ALTER COLUMN "sections" SET DEFAULT ARRAY['U1400', 'U1800', 'Open']::TEXT[];
