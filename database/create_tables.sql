-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ddd_test
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ddd_test` ;

-- -----------------------------------------------------
-- Schema ddd_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ddd_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
SHOW WARNINGS;
USE `ddd_test` ;

-- -----------------------------------------------------
-- Table `ddd_test`.`kapitels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`kapitels` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`kapitels` (
  `number` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `title` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`number`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`themas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`themas` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`themas` (
  `kapitel` INT NOT NULL COMMENT '',
  `number` INT NOT NULL COMMENT '',
  `subtitle` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`kapitel`, `number`)  COMMENT '',
  CONSTRAINT `fk_themas_1`
    FOREIGN KEY (`kapitel`)
    REFERENCES `ddd_test`.`kapitels` (`number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`slides`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`slides` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`slides` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `kapitel` INT NULL COMMENT '',
  `thema` INT NULL COMMENT '',
  `content` TEXT NULL COMMENT '',
  `type` VARCHAR(45) NULL COMMENT '',
  `label` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '',
  INDEX `fk_slides_1_idx` (`kapitel` ASC)  COMMENT '',
  INDEX `fk_slides_2_idx` (`thema` ASC)  COMMENT '',
  CONSTRAINT `fk_slides_1`
    FOREIGN KEY (`kapitel`)
    REFERENCES `ddd_test`.`kapitels` (`number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_slides_2`
    FOREIGN KEY (`thema`)
    REFERENCES `ddd_test`.`themas` (`kapitel`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`slide_mapping`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`slide_mapping` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`slide_mapping` (
  `slide_id` INT NOT NULL COMMENT '',
  `order` INT NULL COMMENT '',
  `group_id` INT NOT NULL COMMENT '',
  PRIMARY KEY (`slide_id`, `group_id`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`groups` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`users` (
  `id` INT NOT NULL COMMENT '',
  `email_id` VARCHAR(128) NULL COMMENT '',
  `email_domain` VARCHAR(128) NULL COMMENT '',
  `first_name` VARCHAR(45) NULL COMMENT '',
  `last_name` VARCHAR(45) NULL COMMENT '',
  `last_login_time` DATETIME NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`roles` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`roles` (
  `role_id` INT NOT NULL COMMENT '',
  `name` VARCHAR(45) NULL COMMENT '',
  PRIMARY KEY (`role_id`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`slide_responses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`slide_responses` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`slide_responses` (
  `user_id` INT NOT NULL COMMENT '',
  `slide_id` INT NOT NULL COMMENT '',
  `form_id` VARCHAR(45) NOT NULL COMMENT '',
  `form_data` TEXT NULL COMMENT '',
  `kapitel` INT NULL COMMENT '',
  `thema` INT NULL COMMENT '',
  PRIMARY KEY (`user_id`, `form_id`)  COMMENT '',
  CONSTRAINT `fk_responses_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `ddd_test`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ddd_test`.`vocab`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ddd_test`.`vocab` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ddd_test`.`vocab` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `chapter` INT NOT NULL COMMENT '',
  `theme` INT NOT NULL COMMENT '',
  `article` VARCHAR(3) NULL COMMENT '',
  `letter` VARCHAR(1) NULL COMMENT '',
  `word` VARCHAR(255) NULL COMMENT '',
  `stem_change` VARCHAR(120) NULL COMMENT '',
  `translation` VARCHAR(255) NULL COMMENT '',
  `n_noun` VARCHAR(11) NULL COMMENT '',
  `plural_noun` VARCHAR(12) NULL COMMENT '',
  `simple_past` VARCHAR(12) NULL COMMENT '',
  `sein_verb` INT NULL COMMENT '',
  `irreg` INT NULL COMMENT '',
  `strong` INT NULL COMMENT '',
  `past_part` VARCHAR(120) NULL COMMENT '',
  `junk_drawer` INT NULL COMMENT '',
  `example1` INT NULL COMMENT '',
  `example2` INT NULL COMMENT '',
  `example3` INT NULL COMMENT '',
  `example4` INT NULL COMMENT '',
  PRIMARY KEY (`id`)  COMMENT '')
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
