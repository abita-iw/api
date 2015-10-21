source change_scripts/create_imageSizes.sql;

LOAD DATA LOCAL INFILE
    './data/imageSizes.csv'
INTO TABLE
    `iw_api`.`users`
FIELDS TERMINATED BY
    ','
LINES TERMINATED BY '\n';
