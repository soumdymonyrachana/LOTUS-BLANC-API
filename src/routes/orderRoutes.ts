import { Router } from "express";
import * as orderController from "../controllers/orderController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API for managing customer orders
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *
 *   post:
 *     summary: Place a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerName
 *               - phone
 *               - totalPrice
 *               - items
 *             properties:
 *               customerName:
 *                 type: string
 *               phone:
 *                 type: string
 *               totalPrice:
 *                 type: number
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - dishId
 *                     - quantity
 *                   properties:
 *                     dishId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid input
 */

router.get("/", orderController.getOrders);
router.post("/", orderController.postOrder);

export default router;