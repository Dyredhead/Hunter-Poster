-- This file is responsible to properly initiate the database and all types required for the app to function
-- Stores users, exercises, items, class types
-- !Database gainzdb is initially created during postgres initialization, no need to create a new one
-- Enter database to initialize it
--\c gainzdb;
--
-- Gives functions for hashing and veryfying passwords within postgres
CREATE EXTENSION pgcrypto;

-- Enums:
CREATE TYPE enum_name AS ENUM ('variant 1', 'variant 2');

-- Structs:
CREATE TYPE struct_name AS (field1 INTEGER, field2 TEXT);

-- Tables
CREATE TABLE
    IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL
    );


