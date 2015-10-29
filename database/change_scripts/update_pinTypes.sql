source change_scripts/create_pinTypes.sql;

LOAD DATA LOCAL INFILE
    './data/pinTypes.csv'
INTO TABLE
    `iw_api`.`pinTypes`
FIELDS TERMINATED BY
    ','
LINES TERMINATED BY '\n';
