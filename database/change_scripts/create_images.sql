-- -----------------------------------------------------
-- Table `iw_api`.`images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`images` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`images` (
  `imageId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT NOT NULL COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `dateModified` DATETIME NOT NULL COMMENT '',
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`imageId`)  COMMENT '',
  INDEX `fk_images_1_idx` (`userId` ASC)  COMMENT '',
  INDEX `fk_images_2_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_images_1`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_images_2`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
