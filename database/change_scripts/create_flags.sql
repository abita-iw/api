-- -----------------------------------------------------
-- Table `iw_api`.`flags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`flags` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`flags` (
  `userId` INT NOT NULL COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  PRIMARY KEY (`userId`, `pinId`)  COMMENT '',
  INDEX `fk_flags_2_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_flags_1`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_flags_2`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
