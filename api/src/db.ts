import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_PREFIX,
  POSTGRES_DB_NAME,
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  PG_DATABASE_URL
} = process.env;

const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}/${POSTGRES_DB_PREFIX}_${POSTGRES_DB_NAME}?sslmode=require`;

const pool = new Pool({
  connectionString: PG_DATABASE_URL || connectionString,
});

const MAX_RETRIES = 10;
const RETRY_DELAY = 5000;

export async function connectWithRetry(retries = 0): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('Connected to the database successfully');
    client.release();
  } catch (error) {
    if (retries >= MAX_RETRIES) {
      console.error('Failed to connect to the database after max retries:', error);
      throw error;
    }

    console.warn(`Failed to connect to the database (attempt ${retries + 1}/${MAX_RETRIES}):`, error);

    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    await connectWithRetry(retries + 1);
  }
}

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

export default pool;
