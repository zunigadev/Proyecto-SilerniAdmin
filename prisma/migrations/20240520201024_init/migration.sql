/*
  Warnings:

  - A unique constraint covering the columns `[credentialId]` on the table `DataTutor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[credentialId]` on the table `PostulationChild` will be added. If there are existing duplicate values, this will fail.
  - Made the column `password` on table `credential` required. This step will fail if there are existing NULL values in that column.
  - Made the column `repPassword` on table `credential` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `credential` MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `repPassword` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `datatutor` ADD COLUMN `credentialId` INTEGER NULL;

-- AlterTable
ALTER TABLE `postulationchild` ADD COLUMN `credentialId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SequenceCounter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastUsed` INTEGER NOT NULL,

    UNIQUE INDEX `SequenceCounter_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DataTutor_credentialId_key` ON `DataTutor`(`credentialId`);

-- CreateIndex
CREATE UNIQUE INDEX `PostulationChild_credentialId_key` ON `PostulationChild`(`credentialId`);

-- AddForeignKey
ALTER TABLE `DataTutor` ADD CONSTRAINT `DataTutor_credentialId_fkey` FOREIGN KEY (`credentialId`) REFERENCES `Credential`(`idCredential`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostulationChild` ADD CONSTRAINT `PostulationChild_credentialId_fkey` FOREIGN KEY (`credentialId`) REFERENCES `Credential`(`idCredential`) ON DELETE SET NULL ON UPDATE CASCADE;
