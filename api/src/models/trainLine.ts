import pool from '../db';

export async function createTrainLineModel(stations: string[], name: string, fare: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query('INSERT INTO train_lines (stations, name, fare) VALUES ($1, $2, $3) RETURNING *', [stations, name, fare]);
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
