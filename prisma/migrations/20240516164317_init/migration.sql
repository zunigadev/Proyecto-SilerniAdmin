-- CreateTable
CREATE TABLE `DataTutor` (
    `idDataTutor` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `documentType` VARCHAR(191) NULL,
    `document` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `relationship` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,

    PRIMARY KEY (`idDataTutor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostulationChild` (
    `idPostulationChild` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `paternalLastName` VARCHAR(191) NULL,
    `maternalLastName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `birthDate` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `justification` VARCHAR(191) NULL,
    `grade` VARCHAR(191) NULL,
    `PostulationChildcol` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `DataTutor_idDataTutor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPostulationChild`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilesPostulation` (
    `idFilesPostulation` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `link` VARCHAR(191) NULL,
    `PostulationChild_idPostulationChild` INTEGER NOT NULL,

    PRIMARY KEY (`idFilesPostulation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostulationChild` ADD CONSTRAINT `PostulationChild_DataTutor_idDataTutor_fkey` FOREIGN KEY (`DataTutor_idDataTutor`) REFERENCES `DataTutor`(`idDataTutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilesPostulation` ADD CONSTRAINT `FilesPostulation_PostulationChild_idPostulationChild_fkey` FOREIGN KEY (`PostulationChild_idPostulationChild`) REFERENCES `PostulationChild`(`idPostulationChild`) ON DELETE RESTRICT ON UPDATE CASCADE;
