CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_external_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (user_id, product_external_id)
VALUES (2, 'p-1073')

