-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_taskId_fkey`;

-- AlterTable
ALTER TABLE `tasks` MODIFY `taskId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `tasks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
