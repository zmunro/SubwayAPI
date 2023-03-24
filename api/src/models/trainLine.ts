import pool from '../db';

export async function createTrainLineModel(stations: string[], name: string, fare?:number) {
  let queryString = 'INSERT INTO train_lines (stations_array, name) VALUES ($1, $2) RETURNING *'
  let queryArgs = [stations, name]
  console.log(`Creating train line: stations - ${stations}, name - ${name}, fare - ${fare}`);
  if (fare) {
    queryString = 'INSERT INTO train_lines (stations_array, name, fare) VALUES ($1, $2, $3) RETURNING *'
    queryArgs.push(fare.toString())
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await client.query(queryString, queryArgs);
    let index = 0;
    let neighbours = [];
    for (const stationName of stations) {
      if (index === 0) {
        neighbours = stations.slice(1, 2);
      } else if (index === (stations.length - 1)) {
        console.log(`inserting station from end of station list: ${[stations[index - 1]]}`)
        neighbours = [stations[index - 1]]; 
        // We know there are at least 2 elements or this would not have looped a second time to get here
      } else {
        neighbours = [stations[index - 1], stations[index + 1]];
      }
      index += 1
      await client.query(`
      INSERT INTO stations (name, neighboring_stations) 
        VALUES ($1, $2)
        ON CONFLICT (name)
        DO UPDATE SET neighboring_stations = stations.neighboring_stations || $2`
      , [stationName, neighbours])
    }
    await client.query('COMMIT');
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
