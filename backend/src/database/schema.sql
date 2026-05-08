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

CREATE TABLE
    IF NOT EXISTS follows (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        follewer_id UUID NOT NULL
        following_id UUID NOT NULL

        CONSTRAINT follower_constraint
            FOREIGN KEY (follower_id)
            REFERENCES users(id)

        CONSTRAINT following_constraint
            FOREIGN KEY (following_id)
            REFERENCES users(id)
    );


CREATE TABLE
    IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        user_id UUID NOT NULL
        created_at timestamp DEFAULT CURRENT_TIMESTAMP
        title TEXT NOT NULL
        content TEXT NOT NULL
        image_url TEXT

        CONSTRAINT posts_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)
    );

CREATE TABLE
    IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        user_id UUID NOT NULL
        post_id UUID NOT NULL
        comment_id UUID
        content TEXT NOT NULL

        CONSTRAINT comments_user_id_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            
        CONSTRAINT comments_post_id_constraint
            FOREIGN KEY (post_id)
            REFERENCES posts(id)
            ON DELETE CASCADE
        
        CONSTRAINT comments_comment_id_constraint
            FOREIGN KEY (comment_id)
            REFERENCES comments(id)
            ON DELETE CASCADE
    );



CREATE TABLE
    IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        user_id UUID NOT NULL
        post_id UUID NOT NULL

        CONSTRAINT booksmarks_user_id_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)
        
        CONSTRAINT booksmarks_post_id_constraint
            FOREIGN KEY (post_id)
            REFERENCES posts(id)
            ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS comment_likes (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        user_id UUID NOT NULL
        comment_id UUID NOT NULL

        CONSTRAINT comment_likes_user_id_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)

        CONSTRAINT comment_likes_comment_id_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE

    );

CREATE TABLE
    IF NOT EXISTS post_likes (
        id UUID PRIMARY KEY DEFAULT uuidv7(),
        user_id UUID NOT NULL
        post_id UUID NOT NULL

        CONSTRAINT post_likes_user_id_constraint
            FOREIGN KEY (user_id)
            REFERENCES users(id)

        CONSTRAINT post_likes_post_id_constraint
            FOREIGN KEY (post_id)
            REFERENCES posts(id)
            ON DELETE CASCADE
    );