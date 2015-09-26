-- -----------------------------------------------------
-- Table `iw_api`.`stars`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`stars` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`stars` (
  `userId` INT NOT NULL COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`userId`, `pinId`)  COMMENT '',
  INDEX `fk_stars_2_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_stars_1`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_stars_2`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
