-- Seed Images
WITH inserted_images AS (
    INSERT INTO images (image_type, image_mime, image_data) VALUES
        ('pfp', 'image/svg+xml', decode('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMC41ODMzMzMgMTAuNTgzMzMzIiB2ZXJzaW9uPSIxLjEiIGlkPSJzdmcxIj4KICA8ZGVmcyBpZD0iZGVmczEiPjwvZGVmcz4KICA8ZyBpZD0ibGF5ZXIxIj4KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6I2ZmMDAwMDtzdHJva2Utd2lkdGg6MC41MzQxNTUiIGlkPSJwYXRoMSIgY3g9IjUuMjkxNjY2NSIgY3k9IjUuMjkxNjY2NSIgcj0iNS4yOTE2NjY1Ij48L2NpcmNsZT4KICAgIDx0ZXh0IHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmb250LXNpemU6My4xNzVweDt3cml0aW5nLW1vZGU6bHItdGI7ZGlyZWN0aW9uOmx0cjtmaWxsOiNmZjU1NTU7c3Ryb2tlLXdpZHRoOjAuMzk2ODc1IiB4PSIyLjU5MDc5NjkiIHk9IjguMzI2OTcyIiBpZD0idGV4dDIiPgogICAgICA8dHNwYW4gaWQ9InRzcGFuMiIgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7Zm9udC1zaXplOjguNDY2NjdweDtmb250LWZhbWlseTpTYW5zOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J1NhbnMsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtZWFzdC1hc2lhbjpub3JtYWw7ZmlsbDojMWExYTFhO3N0cm9rZS13aWR0aDowLjM5Njg3NSIgeD0iMi41OTA3OTY5IiB5PSI4LjMyNjk3MiI+QTwvdHNwYW4+CiAgICA8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K', 'base64')), -- Alice pfp
        ('pfp', 'image/svg+xml', decode('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMC41ODMzMzMgMTAuNTgzMzMzIiB2ZXJzaW9uPSIxLjEiIGlkPSJzdmcxIj4KICA8ZGVmcyBpZD0iZGVmczEiPjwvZGVmcz4KICA8ZyBpZD0ibGF5ZXIxIj4KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzAwZmYwMDtzdHJva2Utd2lkdGg6MC41MzQxNTUiIGlkPSJwYXRoMSIgY3g9IjUuMjkxNjY2NSIgY3k9IjUuMjkxNjY2NSIgcj0iNS4yOTE2NjY1Ij48L2NpcmNsZT4KICAgIDx0ZXh0IHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmb250LXNpemU6My4xNzVweDt3cml0aW5nLW1vZGU6bHItdGI7ZGlyZWN0aW9uOmx0cjtmaWxsOiNmZjU1NTU7c3Ryb2tlLXdpZHRoOjAuMzk2ODc1IiB4PSIyLjM1Nzk2MjEiIHk9IjguMzE0MjcxIiBpZD0idGV4dDIiPgogICAgICA8dHNwYW4gaWQ9InRzcGFuMiIgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7Zm9udC1zaXplOjguNDY2NjdweDtmb250LWZhbWlseTpTYW5zOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J1NhbnMsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtZWFzdC1hc2lhbjpub3JtYWw7ZmlsbDojMWExYTFhO3N0cm9rZS13aWR0aDowLjM5Njg3NSIgeD0iMi4zNTc5NjIxIiB5PSI4LjMxNDI3MSI+QjwvdHNwYW4+CiAgICA8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K', 'base64')), -- Bob pfp
        ('pfp', 'image/svg+xml', decode('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMC41ODMzMzMgMTAuNTgzMzMzIiB2ZXJzaW9uPSIxLjEiIGlkPSJzdmcxIj4KICA8ZGVmcyBpZD0iZGVmczEiPjwvZGVmcz4KICA8ZyBpZD0ibGF5ZXIxIj4KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6IzAwMDBmZjtzdHJva2Utd2lkdGg6MC41MzQxNTUiIGlkPSJwYXRoMSIgY3g9IjUuMjkxNjY2NSIgY3k9IjUuMjkxNjY2NSIgcj0iNS4yOTE2NjY1Ij48L2NpcmNsZT4KICAgIDx0ZXh0IHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmb250LXNpemU6My4xNzVweDt3cml0aW5nLW1vZGU6bHItdGI7ZGlyZWN0aW9uOmx0cjtmaWxsOiNmZjU1NTU7c3Ryb2tlLXdpZHRoOjAuMzk2ODc1IiB4PSIyLjQ4OTE5NjEiIHk9IjguMzE0MjcxIiBpZD0idGV4dDIiPgogICAgICA8dHNwYW4gaWQ9InRzcGFuMiIgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7Zm9udC1zaXplOjguNDY2NjdweDtmb250LWZhbWlseTpTYW5zOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J1NhbnMsIE5vcm1hbCc7Zm9udC12YXJpYW50LWxpZ2F0dXJlczpub3JtYWw7Zm9udC12YXJpYW50LWNhcHM6bm9ybWFsO2ZvbnQtdmFyaWFudC1udW1lcmljOm5vcm1hbDtmb250LXZhcmlhbnQtZWFzdC1hc2lhbjpub3JtYWw7ZmlsbDojMWExYTFhO3N0cm9rZS13aWR0aDowLjM5Njg3NSIgeD0iMi40ODkxOTYxIiB5PSI4LjMxNDI3MSI+QzwvdHNwYW4+CiAgICA8L3RleHQ+CiAgPC9nPgo8L3N2Zz4K', 'base64')), -- Charles pfp
        ('pfp', 'image/svg+xml', decode('PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMC41ODMzMzMgMTAuNTgzMzMzIiB2ZXJzaW9uPSIxLjEiIGlkPSJzdmcxIj4KICA8ZGVmcyBpZD0iZGVmczEiPjwvZGVmcz4KICA8ZyBpZD0ibGF5ZXIxIj4KICAgIDxjaXJjbGUgc3R5bGU9ImZpbGw6I2ZmZmYwMDtzdHJva2Utd2lkdGg6MC41MzQxNTUiIGlkPSJwYXRoMSIgY3g9IjUuMjkxNjY2NSIgY3k9IjUuMjkxNjY2NSIgcj0iNS4yOTE2NjY1Ij48L2NpcmNsZT4KICAgIDx0ZXh0IHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmb250LXNpemU6My4xNzVweDt3cml0aW5nLW1vZGU6bHItdGI7ZGlyZWN0aW9uOmx0cjtmaWxsOiNmZjU1NTU7c3Ryb2tlLXdpZHRoOjAuMzk2ODc1IiB4PSIyLjA0ODkyOSIgeT0iOC4zMTQyNzEiIGlkPSJ0ZXh0MiI+CiAgICAgIDx0c3BhbiBpZD0idHNwYW4yIiBzdHlsZT0iZm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDtmb250LXNpemU6OC40NjY2N3B4O2ZvbnQtZmFtaWx5OlNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonU2FucywgTm9ybWFsJztmb250LXZhcmlhbnQtbGlnYXR1cmVzOm5vcm1hbDtmb250LXZhcmlhbnQtY2Fwczpub3JtYWw7Zm9udC12YXJpYW50LW51bWVyaWM6bm9ybWFsO2ZvbnQtdmFyaWFudC1lYXN0LWFzaWFuOm5vcm1hbDtmaWxsOiMxYTFhMWE7c3Ryb2tlLXdpZHRoOjAuMzk2ODc1IiB4PSIyLjA0ODkyOSIgeT0iOC4zMTQyNzEiPkQ8L3RzcGFuPgogICAgPC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==', 'base64')) -- Dylan pfp
    RETURNING id, image_type, image_mime, image_data
),

-- Seed Users
inserted_users AS (
    INSERT INTO users (username, email, password_hash, description, pfp_id) VALUES
        ('Test', 'test@gmail.com', crypt('test', gen_salt('md5')), 'Test description', null),
        ('Alice', 'alice@gmail.com', crypt('12345', gen_salt('md5')), 'Alice description', (SELECT id FROM inserted_images WHERE image_type = 'pfp' ORDER BY id  LIMIT 1 OFFSET 0)),
        ('Bob', 'bob@gmail.com', crypt('12345', gen_salt('md5')), 'Bob description', (SELECT id FROM inserted_images WHERE image_type = 'pfp' ORDER BY id  LIMIT 1 OFFSET 1)),
        ('Charles', 'charles@gmail.com', crypt('12345', gen_salt('md5')), 'Charles description', (SELECT id FROM inserted_images WHERE image_type = 'pfp' ORDER BY id  LIMIT 1 OFFSET 2)),
        ('Dylan', 'dylan@gmail.com', crypt('12345', gen_salt('md5')), 'Dylan description', (SELECT id FROM inserted_images WHERE image_type = 'pfp' ORDER BY id  LIMIT 1 OFFSET 3))
    RETURNING id, username
),

-- Seed Followers (Alice, Bob follow Test)
insert_followers AS (
    INSERT INTO user_follows (follower_id, following_id) VALUES
        ((SELECT id FROM inserted_users WHERE username = 'Alice'), (SELECT id FROM inserted_users WHERE username = 'Test')),
        ((SELECT id FROM inserted_users WHERE username = 'Bob'), (SELECT id FROM inserted_users WHERE username = 'Test'))
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
        ((SELECT id FROM inserted_users WHERE username = 'Test'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Alice'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Bob'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Charles'), 'text'),
        ((SELECT id FROM inserted_users WHERE username = 'Dylan'), 'text')
    RETURNING id, user_id
),

-- Seed Text Posts
insert_text_posts AS (
    INSERT INTO posts_text (post_id, text) VALUES
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Test')), 'Lorem Ipsum 0'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Alice')), 'Lorem Ipsum 1'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Bob')), 'Lorem Ipsum 2'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Charles')), 'Lorem Ipsum 3'),
        ((SELECT id FROM insert_posts WHERE user_id = (SELECT id FROM inserted_users WHERE username = 'Dylan')), 'Lorem Ipsum 4')
    RETURNING * -- required
)

-- Dummy statment to close off WITH block
SELECT 'Seeding successful' AS result;
