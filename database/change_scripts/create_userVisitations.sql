-- -----------------------------------------------------
-- Table `iw_api`.`userVisitations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`userVisitations` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`userVisitations` (
  `userId` INT NOT NULL COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  PRIMARY KEY (`userId`, `pinId`)  COMMENT '',
  INDEX `fk_userVisitations_2_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_userVisitations_1`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userVisitations_2`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
