-- -----------------------------------------------------
-- Table `iw_api`.`links`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`links` ;

CREATE TABLE IF NOT EXISTS `iw_api`.`links` (
  `linkId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `pinId` INT NOT NULL,
  `link` VARCHAR(255) NOT NULL,
  `dateCreated` DATETIME NOT NULL,
  `dateModified` DATETIME NOT NULL,
  PRIMARY KEY (`linkId`),
  INDEX `fk_links_1_idx` (`pinId` ASC),
  INDEX `fk_links_2_idx` (`userId` ASC),
  CONSTRAINT `fk_links_1`
    FOREIGN KEY (`pinId`)
    REFERENCES `iw_api`.`pins` (`pinId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_links_2`
    FOREIGN KEY (`userId`)
    REFERENCES `iw_api`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
