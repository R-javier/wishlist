CREATE TABLE IF NOT EXISTS favourites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_favourites_user_product
ON favourites(user_id, product_id);

