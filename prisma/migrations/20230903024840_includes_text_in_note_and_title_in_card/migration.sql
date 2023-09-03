/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId]` on the table `notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_userId_key" ON "cards"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_userId_key" ON "notes"("title", "userId");
