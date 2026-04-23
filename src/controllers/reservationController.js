import * as reservationService from '../services/reservationService.js';
export const postReservation = async (req, res) => {
    try {
        const reservation = await reservationService.createReservation(req.body);
        res.status(201).json(reservation);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const listReservations = async (_req, res) => {
    try {
        const reservations = await reservationService.getReservations();
        res.json(reservations);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const patchStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await reservationService.updateReservationStatus(Number(id), status);
        res.json(updated);
    }
    catch (error) {
        res.status(404).json({ error: "Reservation not found" });
    }
};
//# sourceMappingURL=reservationController.js.map