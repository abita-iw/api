source change_scripts/create_users.sql;

LOAD DATA LOCAL INFILE
    './data/users.csv'
INTO TABLE
    `iw_api`.`users`
FIELDS TERMINATED BY
    ','
LINES TERMINATED BY '\n';
