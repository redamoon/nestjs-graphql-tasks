/*
  Warnings:

  - You are about to drop the column `createAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;
