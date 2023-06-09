GRANT ALL PRIVILEGES ON DATABASE db_subway TO root;


CREATE TABLE IF NOT EXISTS train_lines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  stations_array TEXT [],
  fare NUMERIC(5, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS stations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  neighboring_stations TEXT []
);

CREATE TABLE IF NOT EXISTS cards (
  id SERIAL PRIMARY KEY,
  number VARCHAR(255) UNIQUE NOT NULL,
  balance NUMERIC(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS rides (
  id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES cards (id) ON DELETE CASCADE,
  origin_station VARCHAR(255) REFERENCES stations (name) ON DELETE CASCADE,
  exit_station VARCHAR(255) REFERENCES stations (name) ON DELETE CASCADE,
  enter_time TIMESTAMP NOT NULL,
  exit_time TIMESTAMP
);