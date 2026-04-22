import { Router } from "express";
import * as dishController from "../controllers/dishController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Dishes
 *     description: Menu item management
 */

/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags:
 *       - Dishes
 *     responses:
 *       200:
 *         description: List of menu items
 *
 *   post:
 *     summary: Create a new dish
 *     tags:
 *       - Dishes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Dish created successfully
 */

router.get("/", dishController.getDishes);
router.post("/", dishController.postDish);
router.delete("/:id", dishController.removeDish);

export default router;