BEGIN;

CREATE TABLE habits (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  ai_explanation TEXT,
  user_id TEXT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  habit_id TEXT NOT NULL REFERENCES habits(id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE reminder_unit AS ENUM ('minutes', 'hours', 'days');

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  task_id TEXT REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE, -- a task can be a subtask of another task
  goal_id TEXT REFERENCES goals(id) ON UPDATE CASCADE ON DELETE CASCADE, -- a task can be associated with a goal
  habit_id TEXT NOT NULL REFERENCES habits(id) ON UPDATE CASCADE ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT FALSE NOT NULL,
  reminder_multiplier INT,
  reminder_unit reminder_unit,
  -- HH-MM string for day
  -- for hours, it can be a MM string
  -- if it is a HH-MM string for hours/minutes, the next reminder will be at that
  -- time, and after that will be at the recurring reminder time
  reminder_subunit TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;
