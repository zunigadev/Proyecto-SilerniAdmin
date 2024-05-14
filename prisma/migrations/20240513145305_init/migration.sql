-- CreateTable
CREATE TABLE `User` (
    `idUser` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `p_surname` VARCHAR(191) NOT NULL,
    `m_surname` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `credentialId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_credentialId_key`(`credentialId`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credential` (
    `idCredential` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `repPassword` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Credential_code_key`(`code`),
    UNIQUE INDEX `Credential_password_key`(`password`),
    UNIQUE INDEX `Credential_repPassword_key`(`repPassword`),
    PRIMARY KEY (`idCredential`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_credentialId_fkey` FOREIGN KEY (`credentialId`) REFERENCES `Credential`(`idCredential`) ON DELETE RESTRICT ON UPDATE CASCADE;
