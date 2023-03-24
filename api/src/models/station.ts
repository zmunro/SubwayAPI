import pool from '../db';

export async function getStationNeighbors(station: string) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const neighbors = await client.query('SELECT neighboring_stations FROM stations WHERE name = $1', [station]);
    await client.query('COMMIT');
    return neighbors;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function enterStation(station: string, card_number: string) {
  const client = await pool.connect();
  // try {
    await client.query("BEGIN");
    const card = await client.query("SELECT * FROM cards WHERE number = $1", [
      card_number,
    ]);
    if (card.rowCount === 0) {
      throw new Error("Card not found");
    }
    const fareRows = await client.query(
      "SELECT fare FROM train_lines WHERE $1 = ANY(stations_array) ORDER BY fare ASC LIMIT 1",
      [station]
    );
    if (fareRows.rowCount === 0) {
      throw new Error("Station not found");
    }
    const updatedCard = await client.query(
      "UPDATE cards SET balance = balance - $1 WHERE number = $2 RETURNING *",
      [fareRows.rows[0].fare, card_number]
    );
    const rideLog = await client.query(
      "INSERT INTO rides (card_id, origin_station, enter_time) VALUES ($1, $2, NOW()) RETURNING *",
      [card.rows[0].id, station]
    );
    await client.query("COMMIT");
    return updatedCard.rows[0]['balance'];
  // } catch (error) {
  //   await client.query("ROLLBACK");
  //   throw error;
  // } finally {
    client.release();
  // }
}

export async function exitStation(station: string, card_number: string) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const card = await client.query("SELECT * FROM cards WHERE number = $1", [
      card_number,
    ]);
    if (card.rowCount === 0) {
      throw new Error("Card not found");
    }
    const rideLog = await client.query(
      "UPDATE rides SET exit_station = $1, exit_time = NOW() WHERE card_id = $2 AND exit_time IS NULL RETURNING *",
      [station, card.rows[0].id]
    );
    await client.query("COMMIT");
    return card.rows[0]['balance'];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
