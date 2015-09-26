-- -----------------------------------------------------
-- Table `iw_api`.`pinTags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`pinTags` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`pinTags` (
  `pinId` INT NOT NULL COMMENT '',
  `tagId` INT NOT NULL COMMENT '',
  PRIMARY KEY (`pinId`, `tagId`)  COMMENT '',
  INDEX `fk_pinTags_2_idx` (`tagId` ASC)  COMMENT '',
  CONSTRAINT `fk_pinTags_1`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pinTags_2`
    FOREIGN KEY (`tagId`)
    REFERENCES `iw_api`.`tags` (`tagId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;
