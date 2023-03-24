import pool from '../db';

export async function createOrUpdateCard(number: string, amount: number) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const existingCard = await client.query('SELECT * FROM cards WHERE number = $1', [number]);
    let card;

    if (existingCard.rowCount === 0) {
      card = await client.query('INSERT INTO cards (number, balance) VALUES ($1, $2) RETURNING *', [number, amount]);
    } else {0
      card = await client.query('UPDATE cards SET balance = balance + $1 WHERE number = $2 RETURNING *', [amount, number]);
    }

    await client.query('COMMIT');
    return card.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
