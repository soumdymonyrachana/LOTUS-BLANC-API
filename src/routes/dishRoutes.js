import { Router } from "express";
import * as dishController from "../controllers/dishController.js";
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Dish:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         imageUrl:
 *           type: string
 *         categoryId:
 *           type: integer
 */
/**
 * @swagger
 * tags:
 *   - name: Dishes
 *     description: Menu item management
 */
/// ========================
/// GET ALL DISHES
/// ========================
/// ========================
/// GET ONE DISH (specific route before general)
/// ========================
/**
 * @swagger
 * /api/dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dish found
 *       404:
 *         description: Dish not found
 */
router.get("/:id", dishController.getDishById);
/// ========================
/// UPDATE DISH
/// ========================
/**
 * @swagger
 * /api/dishes/{id}:
 *   put:
 *     summary: Update a dish
 *     tags: [Dishes]
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
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *       404:
 *         description: Dish not found
 */
router.put("/:id", dishController.updateDish);
/// ========================
/// DELETE DISH
/// ========================
/**
 * @swagger
 * /api/dishes/{id}:
 *   delete:
 *     summary: Delete a dish
 *     tags: [Dishes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *       404:
 *         description: Dish not found
 */
router.delete("/:id", dishController.removeDish);
/// ========================
/// GET ALL DISHES (general route after specific)
/// ========================
/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: List of all dishes
 */
router.get("/", dishController.getDishes);
/// ========================
/// CREATE DISH
/// ========================
/**
 * @swagger
 * /api/dishes:
 *   post:
 *     summary: Create a new dish
 *     tags: [Dishes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       201:
 *         description: Dish created successfully
 */
router.post("/", dishController.postDish);
export default router;
//# sourceMappingURL=dishRoutes.js.map