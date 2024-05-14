/*
  Warnings:

  - You are about to drop the column `code` on the `credential` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Credential_code_key` ON `credential`;

-- DropIndex
DROP INDEX `Credential_password_key` ON `credential`;

-- DropIndex
DROP INDEX `Credential_repPassword_key` ON `credential`;

-- AlterTable
ALTER TABLE `credential` DROP COLUMN `code`;
