import { Request, Response } from 'express';
import { createTrainLineModel } from '../models/trainLine';

export async function createTrainLine(req: Request, res: Response) {
  try {
    const { stations, name, fare } = req.body;
    if (stations === undefined) {
        res.status(400).json({ message: "Stations list must be provided"});
        return
    }
    if (name === undefined) {
      res.status(400).json({ message: "Name of train line must be provided"});
      return
    }
    console.log(`Received requiest to create Train line with ${req.body.toString()}`)
    const trainLine = await createTrainLineModel(stations, name, fare);
    res.status(201).json({ message: 'Train line created successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
