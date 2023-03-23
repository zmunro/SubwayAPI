import { Request, Response } from 'express';
import { createTrainLineModel } from '../models/trainLine';

export async function createTrainLine(req: Request, res: Response) {
  try {
    const { stations, name, fare } = req.body;
    const trainLine = await createTrainLineModel(stations, name, fare);
    res.status(201).json({ message: 'Train line created successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
