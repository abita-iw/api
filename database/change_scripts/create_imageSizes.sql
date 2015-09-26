-- -----------------------------------------------------
-- Table `iw_api`.`imageSizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`imageSizes` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`imageSizes` (
  `imageSizeId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(32) NOT NULL COMMENT '',
  `height` INT NULL COMMENT '',
  `width` INT NULL COMMENT '',
  PRIMARY KEY (`imageSizeId`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;
