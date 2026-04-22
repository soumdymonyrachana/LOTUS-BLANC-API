import type { Request, Response } from 'express';
import * as reservationService from '../services/reservationService.js';

export const postReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await reservationService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const patchStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await reservationService.updateReservationStatus(Number(id), status);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Reservation not found" });
  }
};