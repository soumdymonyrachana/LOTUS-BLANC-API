import { Router } from "express";
import { handleLogin } from "../controllers/authController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication API
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Admin login (Admin-only)
 *     description: Authenticate admin user and return JWT token. Only admins can login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 adminId:
 *                   type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Admin not found or invalid credentials
 */
router.post("/login", handleLogin);

export default router;