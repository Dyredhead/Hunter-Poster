INSERT INTO users (username, email, password_hash)
VALUES ('test', 'test@gmail.com', crypt('test', gen_salt('md5')));