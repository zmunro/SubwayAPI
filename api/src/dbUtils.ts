// src/dbUtils.ts
import pool from './db';
import { join } from 'path';
import { readFileSync } from 'fs';

export async function createSchema() {
    const client = await pool.connect();
    try {
      const schemaPath = join(__dirname, 'schema.sql');
      const schemaSql = readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
    } catch (error) {
      console.error('Error creating schema:', error);
    } finally {
      client.release();
    }
  }

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
