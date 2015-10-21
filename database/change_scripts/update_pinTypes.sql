source change_scripts/create_pinTypes.sql;

LOAD DATA LOCAL INFILE
    './data/pinTypes.csv'
INTO TABLE
    `iw_api`.`users`
FIELDS TERMINATED BY
    ','
LINES TERMINATED BY '\n';
