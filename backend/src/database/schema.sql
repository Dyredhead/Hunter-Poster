-- This file is responsible to properly initiate the database and all types required for the app to function

-- Gives functions for hashing and veryfying passwords within postgres
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

-- Enums:
CREATE TYPE enum_name AS ENUM ('variant 1', 'variant 2');

-- Structs:
CREATE TYPE struct_name AS (field1 INTEGER, field2 TEXT);

-- Tables
CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        username CITEXT NOT NULL UNIQUE,
        email CITEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
    );

