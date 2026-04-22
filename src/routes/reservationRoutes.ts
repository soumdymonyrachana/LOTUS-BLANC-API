import { Router } from "express";
import * as reservationController from "../controllers/reservationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Table booking management
 */

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: List of bookings
 *
 *   post:
 *     summary: Create a new reservation
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phone
 *               - adults
 *               - children
 *               - bookingDate
 *             properties:
 *               customerName:
 *                 type: string
 *               phone:
 *                 type: string
 *               adults:
 *                 type: integer
 *               children:
 *                 type: integer
 *               bookingDate:
 *                 type: string
 *                 format: date-time
 *               occasion:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.get("/", reservationController.listReservations);
router.post("/", reservationController.postReservation);

/**
 * @swagger
 * /api/reservations/{id}/status:
 *   patch:
 *     summary: Update reservation status (CONFIRMED, CANCELLED, etc.)
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: CONFIRMED
 *     responses:
 *       200:
 *         description: Status updated successfully
 */

router.patch("/:id/status", reservationController.patchStatus);

export default router;