-- -----------------------------------------------------
-- Table `iw_api`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `email` VARCHAR(64) NOT NULL COMMENT '',
  `displayName` VARCHAR(64) NOT NULL COMMENT '',
  `dateCreated` DATETIME NOT NULL COMMENT '',
  `dateModified` DATETIME NOT NULL COMMENT '',
  `isDeleted` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '',
  PRIMARY KEY (`userId`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;
