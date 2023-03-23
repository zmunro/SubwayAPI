import { Request, Response } from 'express';
import { getOptimalRoute } from '../models/route';

export async function getRoute(req: Request, res: Response) {
  try {
    const origin = req.query.origin as string;
    const destination = req.query.destination as string;
    const route = await getOptimalRoute(origin, destination);
    res.status(200).json({ route });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
