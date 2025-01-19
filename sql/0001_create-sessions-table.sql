BEGIN;

CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '7 days',

    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

COMMIT;
