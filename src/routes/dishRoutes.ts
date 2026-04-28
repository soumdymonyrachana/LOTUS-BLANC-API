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
 *         isPublic:
 *           type: boolean
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
/**
 * @swagger
 * /api/dishes:
 *   get:
 *     summary: Get all dishes
 *     tags: [Dishes]
 *     responses:
 *       200:
 *         description: List of dishes
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
 *         description: Created successfully
 */
router.post("/", dishController.postDish);

/// ========================
/// GET ONE DISH
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
/// UPDATE FULL DISH (PUT)
/// ========================
/**
 * @swagger
 * /api/dishes/{id}:
 *   put:
 *     summary: Update a dish completely
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
 *         description: Updated successfully
 */
router.put("/:id", dishController.updateDish);

/// ========================
/// PATCH DISH (PARTIAL UPDATE)
// ========================
/**
 * @swagger
 * /api/dishes/{id}:
 *   patch:
 *     summary: Partially update dish (toggle public/private, etc.)
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               categoryId:
 *                 type: integer
 *               imageUrl:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.patch("/:id", dishController.patchDish);

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
 *         description: Deleted successfully
 */
router.delete("/:id", dishController.removeDish);

export default router;