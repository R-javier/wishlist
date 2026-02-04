CREATE TABLE IF NOT EXISTS favourites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_external_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

ALTER TABLE favourites
ADD CONSTRAINT favourites_user_product_unique
UNIQUE (user_id, product_external_id);