-- -----------------------------------------------------
-- Table `iw_api`.`descriptions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`descriptions` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`descriptions` (
  `descriptionId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT NOT NULL COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  `text` VARCHAR(1000) NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `dateModified` DATETIME NOT NULL COMMENT '',
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`descriptionId`)  COMMENT '',
  INDEX `fk_descriptions_1_idx` (`userId` ASC)  COMMENT '',
  INDEX `fk_descriptions_2_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_descriptions_1`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_descriptions_2`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;