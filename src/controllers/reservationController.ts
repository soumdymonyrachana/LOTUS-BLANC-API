import type { Request, Response } from "express";
import * as reservationService from "../services/reservationService.js";

// CREATE
export const postReservation = async (req: Request, res: Response) => {
  try {
    console.log("Received reservation data:", req.body);
    const reservation = await reservationService.createReservation(req.body);

    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// READ ALL
export const listReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await reservationService.getReservations();
    res.json(reservations);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// READ BY ID
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = await reservationService.getReservationById(Number(id));

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json(reservation);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE FULL (EDIT RESERVATION)
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await reservationService.updateReservation(
      Number(id),
      req.body,
    );

    res.json(updated);
  } catch {
    res.status(404).json({ error: "Reservation not found" });
  }
};

// PATCH STATUS ONLY
export const patchStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await reservationService.updateReservationStatus(
      Number(id),
      status,
    );

    res.json(updated);
  } catch {
    res.status(404).json({ error: "Reservation not found" });
  }
};

// DELETE
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await reservationService.deleteReservation(Number(id));

    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(404).json({ error: "Reservation not found" });
  }
};