-- -----------------------------------------------------
-- Table `iw_api`.`imageUrls`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `iw_api`.`imageUrls` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `iw_api`.`imageUrls` (
  `imageId` INT NOT NULL COMMENT '',
  `imageSizeId` INT NOT NULL COMMENT '',
  `url` VARCHAR(255) NOT NULL COMMENT '',
  PRIMARY KEY (`imageId`, `imageSizeId`)  COMMENT '',
  UNIQUE INDEX `url_UNIQUE` (`url` ASC)  COMMENT '',
  INDEX `fk_imageUrls_2_idx` (`imageSizeId` ASC)  COMMENT '',
  CONSTRAINT `fk_imageUrls_1`
    FOREIGN KEY (`imageId`)
    REFERENCES `iw_api`.`images` (`imageId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imageUrls_2`
    FOREIGN KEY (`imageSizeId`)
    REFERENCES `iw_api`.`imageSizes` (`imageSizeId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS
