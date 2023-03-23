import pool from '../db';

export async function getOptimalRoute(origin: string, destination: string) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT stations FROM train_lines');
    const trainLines = result.rows.map((row: any) => row.stations);

    let minStations = Infinity;
    let optimalRoute = [];

    for (const line of trainLines) {
        const originIndex = line.indexOf(origin);
        const destinationIndex = line.indexOf(destination);
    
        if (originIndex !== -1 && destinationIndex !== -1) {
          const route = line.slice(Math.min(originIndex, destinationIndex), Math.max(originIndex, destinationIndex) + 1);
          if (route.length < minStations) {
            minStations = route.length;
            optimalRoute = route;
          }
        }
      }
    
      if (optimalRoute.length === 0) {
        throw new Error('No route found');
      }
    
      return optimalRoute;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
}
    
