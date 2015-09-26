-- -----------------------------------------------------
-- Table `iw_api`.`tags`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`tags` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`tags` (
  `tagId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(32) NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `dateModified` DATETIME NOT NULL COMMENT '',
  PRIMARY KEY (`tagId`)  COMMENT '',
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;
