-- -----------------------------------------------------
-- Table `iw_api`.`pinTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`pinTypes` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`pinTypes` (
  `pinTypeId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(64) NOT NULL COMMENT '',
  PRIMARY KEY (`pinTypeId`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;
