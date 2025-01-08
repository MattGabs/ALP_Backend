/*
  Warnings:

  - Made the column `imageUri` on table `reports` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reports" ALTER COLUMN "imageUri" SET NOT NULL,
ALTER COLUMN "imageUri" SET DATA TYPE TEXT;
