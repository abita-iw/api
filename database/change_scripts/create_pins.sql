-- -----------------------------------------------------
-- Table `iw_api`.`pins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`pins` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`pins` (
  `pinId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `userId` INT NOT NULL COMMENT '',
  `typeId` INT NOT NULL COMMENT '',
  `caption` VARCHAR(255) NOT NULL COMMENT '',
  `description` VARCHAR(255) NULL COMMENT '',
  `latitude` FLOAT NOT NULL COMMENT '',
  `longitude` FLOAT NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `dateModified` DATETIME NOT NULL COMMENT '',
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`pinId`)  COMMENT '',
  INDEX `fk_pins_1_idx` (`typeId` ASC)  COMMENT '',
  INDEX `fk_pins_2_idx` (`userId` ASC)  COMMENT '',
  CONSTRAINT `fk_pins_1`
    FOREIGN KEY (`typeId`)
    REFERENCES `iw_api`.`pinTypes` (`pinTypeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pins_2`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
