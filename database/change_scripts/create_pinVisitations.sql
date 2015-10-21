-- -----------------------------------------------------
-- Table `iw_api`.`pinVisitations`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`pinVisitations` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`pinVisitations` (
  `pinVisitationId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `pinId` INT NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  PRIMARY KEY (`pinVisitationId`)  COMMENT '',
  INDEX `fk_pinVisitations_1_idx` (`pinId` ASC)  COMMENT '',
  CONSTRAINT `fk_pinVisitations_1`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
