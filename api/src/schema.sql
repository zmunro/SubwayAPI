CREATE TABLE train_lines (
  id SERIAL PRIMARY KEY,
  stations TEXT[] NOT NULL,
  name VARCHAR(255) NOT NULL,
  fare NUMERIC(5, 2) NOT NULL
);

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  number VARCHAR(255) NOT NULL UNIQUE,
  balance NUMERIC(10, 2) NOT NULL
);

CREATE TABLE ride_logs (
  id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES cards(id),
  origin_station VARCHAR(255),
  destination_station VARCHAR(255),
  enter_time TIMESTAMP WITH TIME ZONE,
  exit_time TIMESTAMP WITH TIME ZONE
);
