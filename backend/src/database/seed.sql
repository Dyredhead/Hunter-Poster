
-- Seed Users
WITH inserted_users AS (
    INSERT INTO users (username, email, password_hash) VALUES 
        ('Test', 'test@gmail.com', crypt('test', gen_salt('md5'))),
        ('Alice', 'alice@gmail.com', crypt('12345', gen_salt('md5'))),
        ('Bob', 'bob@gmail.com', crypt('12345', gen_salt('md5'))),
        ('Charles', 'charles@gmail.com', crypt('12345', gen_salt('md5'))),
        ('Dylan', 'dylan@gmail.com', crypt('12345', gen_salt('md5')))
    RETURNING id, username
),

-- Seed Followers (Alice, Bob, Charles follow Test)
insert_followers AS (
    INSERT INTO user_follows (follower_id, following_id) VALUES 
        ((SELECT id FROM inserted_users WHERE username = 'Alice'), (SELECT id FROM inserted_users WHERE username = 'Test')),
        ((SELECT id FROM inserted_users WHERE username = 'Bob'), (SELECT id FROM inserted_users WHERE username = 'Test')),
        ((SELECT id FROM inserted_users WHERE username = 'Charles'), (SELECT id FROM inserted_users WHERE username = 'Test'))
    RETURNING * -- required
),

-- Seed Following (Test follows Alice, Bob, Dylan)
insert_following AS (
    INSERT INTO user_follows (follower_id, following_id) VALUES 
        ((SELECT id FROM inserted_users WHERE username = 'Test'), (SELECT id FROM inserted_users WHERE username = 'Alice')),
        ((SELECT id FROM inserted_users WHERE username = 'Test'), (SELECT id FROM inserted_users WHERE username = 'Bob')),
        ((SELECT id FROM inserted_users WHERE username = 'Test'), (SELECT id FROM inserted_users WHERE username = 'Dylan'))
    RETURNING * -- required
),

-- Seed Posts
insert_posts AS (
    INSERT INTO posts (user_id, post_type) VALUES 
        ((SELECT id FROM inserted_users WHERE username = 'Alice'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Bob'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Charles'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Dylan'), 'text')
    RETURNING id, user_id
),

-- Seed Text Posts
insert_text_posts AS (
    INSERT INTO posts_text (post_id, text) VALUES 
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Alice')), 'Lorem Ipsum 1'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Bob')), 'Lorem Ipsum 2'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Charles')), 'Lorem Ipsum 3'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Dylan')), 'Lorem Ipsum 4')
    RETURNING * -- required
)

-- Dummy statment to close off WITH block
SELECT 'Seeding successful' AS result; 
