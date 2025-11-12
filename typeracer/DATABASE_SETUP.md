# Database Setup for TypeRacer (AI generated)

## Instructions

1. Create a new Supabase project at https://app.supabase.com
2. Go to the SQL Editor in your Supabase dashboard
3. Run the following SQL commands:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Players table (persistent)
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  best_wpm FLOAT DEFAULT 0,
  best_accuracy FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Game rounds table (current round)
CREATE TABLE game_rounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sentence TEXT NOT NULL,
  round_number INT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- Active sessions table (real-time player data)
CREATE TABLE active_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  round_id UUID REFERENCES game_rounds(id) ON DELETE CASCADE,
  progress_length INT DEFAULT 0,
  wpm FLOAT DEFAULT 0,
  accuracy FLOAT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  last_update TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(player_id, round_id)
);

-- Indexes for performance
CREATE INDEX idx_active_sessions_round ON active_sessions(round_id, is_active);
CREATE INDEX idx_sessions_wpm ON active_sessions(wpm DESC);
CREATE INDEX idx_sessions_accuracy ON active_sessions(accuracy DESC);
CREATE INDEX idx_game_rounds_active ON game_rounds(is_active, round_number DESC);

-- Enable Realtime for active_sessions and game_rounds
ALTER PUBLICATION supabase_realtime ADD TABLE active_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE game_rounds;

-- Row Level Security (RLS) - Public access for MVP
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;

-- Allow all operations for MVP (in production, restrict these)
CREATE POLICY "Allow all for players" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for game_rounds" ON game_rounds FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for active_sessions" ON active_sessions FOR ALL USING (true) WITH CHECK (true);

-- Insert initial game round (you'll need to do this once)
INSERT INTO game_rounds (sentence, round_number, started_at, ends_at, is_active)
VALUES (
  'The quick brown fox jumps over the lazy dog.',
  1,
  NOW(),
  NOW() + INTERVAL '60 seconds',
  true
);
```

## Getting your Supabase credentials

1. In your Supabase project dashboard, go to Settings > API
2. Copy the "Project URL" - this is your `NEXT_PUBLIC_SUPABASE_URL`
3. Copy the "anon public" key - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Create a `.env.local` file in the project root and add these values

## Verifying setup

After running the SQL commands:

1. Check the Table Editor to see if tables are created
2. Go to Database > Replication and ensure `active_sessions` and `game_rounds` are enabled for Realtime
