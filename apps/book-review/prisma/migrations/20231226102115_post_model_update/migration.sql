/*
  Warnings:

  - You are about to drop the column `text` on the `Post` table. All the data in the column will be lost.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synopsis` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "text";
ALTER TABLE "Post" ADD COLUMN     "content" STRING NOT NULL;
ALTER TABLE "Post" ADD COLUMN     "synopsis" STRING NOT NULL;
