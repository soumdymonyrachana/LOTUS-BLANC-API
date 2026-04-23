import { Router } from "express";
import * as orderItemController from "../controllers/orderItemController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: OrderItems
 *     description: Management of items within an order
 */

/**
 * @swagger
 * /api/order-items:
 *   post:
 *     summary: Add an item to an existing order
 *     tags:
 *       - OrderItems
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - dishId
 *               - quantity
 *             properties:
 *               orderId:
 *                 type: integer
 *               dishId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added
 */
router.post("/", orderItemController.postOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   patch:
 *     summary: Update item quantity
 *     tags:
 *       - OrderItems
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
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch("/:id", orderItemController.patchOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   delete:
 *     summary: Remove item from order
 *     tags:
 *       - OrderItems
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete("/:id", orderItemController.deleteOrderItem);

export default router;