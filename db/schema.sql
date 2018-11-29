-- DB SCHMEA --

drop database if exists white_elephant_db;

create database white_elephant_db;

use white_elephant_db;

create table white_elephant_db (
    id int not null auto_increment,
    game_name varchar(100) not null,
    gift_dollar_max int not null,
    primary key (id)
);