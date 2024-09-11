/*
  Warnings:

  - You are about to drop the column `taskId` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_taskId_fkey`;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `taskId`,
    ADD COLUMN `mainTask` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_mainTask_fkey` FOREIGN KEY (`mainTask`) REFERENCES `tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
