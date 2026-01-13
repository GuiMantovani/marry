-- Create gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  store_link TEXT,
  image TEXT,
  is_sold_out BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  confirmed BOOLEAN DEFAULT TRUE,
  guest_count INTEGER DEFAULT 0,
  companion_names TEXT[],
  message TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Enable all access for gifts" ON gifts
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable all access for guests" ON guests
  FOR ALL
  USING (true)
  WITH CHECK (true);
