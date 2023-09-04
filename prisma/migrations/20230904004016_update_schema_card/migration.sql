/*
  Warnings:

  - You are about to drop the column `securityCode` on the `cards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `cards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cvv` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `expirationDate` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "securityCode",
ADD COLUMN     "cvv" TEXT NOT NULL,
DROP COLUMN "expirationDate",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_title_key" ON "cards"("title");
