BEGIN;

CREATE TYPE provider_enum AS ENUM ('password', 'github', 'gitlab', 'discord');

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT,
  provider provider_enum NOT NULL,
  provider_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
