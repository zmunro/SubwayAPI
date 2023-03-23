import { Request, Response } from 'express';
import { enterStation, exitStation } from '../models/station';

export async function enter(req: Request, res: Response) {
  try {
    const { card_number } = req.body;
    const station = req.params.station;
    const updatedCard = await enterStation(station, card_number);
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function exit(req: Request, res: Response) {
  try {
    const { card_number } = req.body;
    const station = req.params.station;
    const updatedCard = await exitStation(station, card_number);
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
