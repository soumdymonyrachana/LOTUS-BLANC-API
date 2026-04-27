import { Router } from "express";
import * as reservationController from "../controllers/reservationController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation management API
 */

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 */
router.get("/", reservationController.listReservations);

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     summary: Create reservation
 *     tags: [Reservations]
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
 *                 type: number
 *               children:
 *                 type: number
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
router.post("/", reservationController.postReservation);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/{id}:
 *   put:
 *     summary: Update reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Updated
 */
router.put("/:id", reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{id}/status:
 *   patch:
 *     summary: Update reservation status
 *     tags: [Reservations]
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
 *         description: Updated
 */
router.patch("/:id/status", reservationController.patchStatus);

/**
 * @swagger
 * /api/reservations/{id}:
 *   delete:
 *     summary: Delete reservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 */
router.delete("/:id", reservationController.deleteReservation);

export default router;
