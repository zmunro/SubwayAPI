import pool from '../db';
import { getStationNeighbors } from './station';



export async function getOptimalRoute(origin: string, destination: string) {
  const client = await pool.connect();
  try {
    if (origin === destination) {
      return [origin]
    }
    let seenStations = new Map<string, boolean>();
    let neighbors = (await getStationNeighbors(origin)).rows[0]['neighboring_stations'];
    let paths = neighbors.map((station: string) => [origin, station]);
    seenStations.set(origin, true);

    let index = 0;
    while (index < paths.length) {
      let currentPath = paths[index++]
      let currentStation = currentPath.slice(-1)[0];
      if (seenStations.has(currentStation)) {
        continue;
      }

      if (currentStation == destination) {
        return currentPath
      }
      
      let newNeighbors = (await getStationNeighbors(currentStation)).rows[0]['neighboring_stations'];
      let newPaths = newNeighbors.map((station: string) => currentPath.concat([station]));
      seenStations.set(currentStation, true);
      paths = paths.concat(newPaths);
    }

    // Insecurity here since client provided input is not being sanitized
    throw new Error('No path from origin to destination found.');
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
}
    
