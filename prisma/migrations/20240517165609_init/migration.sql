/*
  Warnings:

  - The primary key for the `datatutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idDataTutor` on the `datatutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `DataTutor_idDataTutor` on the `postulationchild` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `postulationchild` DROP FOREIGN KEY `PostulationChild_DataTutor_idDataTutor_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `credential` ADD COLUMN `code` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `datatutor` DROP PRIMARY KEY,
    MODIFY `idDataTutor` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idDataTutor`);

-- AlterTable
ALTER TABLE `postulationchild` ADD COLUMN `postulationStatus` VARCHAR(191) NOT NULL DEFAULT 'sending',
    MODIFY `DataTutor_idDataTutor` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`;

-- CreateIndex
CREATE UNIQUE INDEX `Credential_code_key` ON `Credential`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Credential_email_key` ON `Credential`(`email`);

-- AddForeignKey
ALTER TABLE `PostulationChild` ADD CONSTRAINT `PostulationChild_DataTutor_idDataTutor_fkey` FOREIGN KEY (`DataTutor_idDataTutor`) REFERENCES `DataTutor`(`idDataTutor`) ON DELETE RESTRICT ON UPDATE CASCADE;
