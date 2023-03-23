// src/dbUtils.ts
import pool from './db';

export const connectWithRetry = () => {
  console.log('Attempting to connect to the database...');
  pool
    .connect()
    .then(() => {
      console.log('Connected to the database successfully');
    })
    .catch((error) => {
      console.error('Failed to connect to the database:', error);
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};
