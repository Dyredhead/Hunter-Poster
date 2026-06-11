-- This file is responsible to properly initiate the database and all types required for the app to function
-- Gives functions for hashing and veryfying passwords within postgres
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE EXTENSION IF NOT EXISTS citext;

-- Enums:
-- CREATE TYPE enum_name AS ENUM ('variant 1', 'variant 2');
CREATE TYPE post_type AS ENUM ('text', 'image', 'text_image', 'poll');

CREATE TYPE poll_position AS ENUM ('1', '2', '3', '4');

CREATE TYPE image_type AS ENUM ('pfp', 'banner', 'post');

-- Structs:
-- CREATE TYPE struct_name AS (field1 INTEGER, field2 TEXT);
-- Tables
CREATE TABLE
    IF NOT EXISTS images (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        image_type IMAGE_TYPE,
        image_mime TEXT,
        image_data BYTEA
    );

CREATE TABLE
    IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        username CITEXT NOT NULL UNIQUE,
        email CITEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
        description TEXT DEFAULT NULL,
        pfp_id UUID DEFAULT NULL REFERENCES images (id),
        banner_id UUID DEFAULT NULL REFERENCES images (id)
    );

CREATE TABLE
    IF NOT EXISTS user_follows (
        follower_id UUID NOT NULL REFERENCES users (id),
        following_id UUID NOT NULL REFERENCES users (id),
        CONSTRAINT user_follows_pk PRIMARY KEY (follower_id, following_id),
        CONSTRAINT user_follows_no_self_follow CHECK (follower_id != following_id)
    );

CREATE TABLE
    IF NOT EXISTS posts (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID NOT NULL REFERENCES users (id),
        post_type POST_TYPE NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS posts_text (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        post_id UUID REFERENCES posts (id) ON DELETE CASCADE,
        text TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS posts_image (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        post_id UUID REFERENCES posts (id) ON DELETE CASCADE,
        image_id UUID REFERENCES images (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS posts_text_and_image (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        post_id UUID REFERENCES posts (id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        image_id UUID REFERENCES images (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS polls (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        post_id UUID REFERENCES posts (id) ON DELETE CASCADE,
        closes_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        question TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS poll_options (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        poll_id UUID NOT NULL REFERENCES polls (id) ON DELETE CASCADE,
        position POLL_POSITION NOT NULL,
        option TEXT NOT NULL,
        CONSTRAINT poll_options_poll_id_position_unique UNIQUE (poll_id, position)
    );

CREATE TABLE
    IF NOT EXISTS poll_votes (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        poll_id UUID NOT NULL REFERENCES polls (id),
        user_id UUID NOT NULL REFERENCES users (id),
        position POLL_POSITION NOT NULL,
        CONSTRAINT poll_votes_poll_user_unique UNIQUE (poll_id, user_id)
    );

CREATE TABLE
    IF NOT EXISTS likes (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID NOT NULL REFERENCES users (id),
        post_id UUID NOT NULL REFERENCES posts (id),
        CONSTRAINT post_likes_user_post_unique UNIQUE (user_id, post_id)
    );

CREATE TABLE
    IF NOT EXISTS bookmarks (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID NOT NULL REFERENCES users (id),
        post_id UUID NOT NULL REFERENCES posts (id)
    );

CREATE TABLE
    IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID NOT NULL REFERENCES users (id),
        comment_id UUID REFERENCES comments (id),
        post_id UUID NOT NULL REFERENCES posts (id),
        content TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS comment_likes (
        id UUID PRIMARY KEY DEFAULT uuidv7 (),
        user_id UUID NOT NULL REFERENCES users (id),
        comment_id UUID NOT NULL REFERENCES comments (id),
        CONSTRAINT user_comment_unique UNIQUE (user_id, comment_id)
    );
