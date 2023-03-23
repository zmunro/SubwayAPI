import { Request, Response } from 'express';
import { createOrUpdateCard } from '../models/card';

export async function createCard(req: Request, res: Response) {
  try {
    const { number, amount } = req.body;
    const card = await createOrUpdateCard(number, amount);
    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
