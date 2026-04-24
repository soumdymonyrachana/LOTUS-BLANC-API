import type { Request, Response } from "express";
import { loginAdmin } from "../services/authService.js";

// REGISTER
// export const handleRegister = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const result = await registerAdmin(email, password);

//     if (!result.success) {
//       return res.status(400).json({ message: result.message });
//     }

//     res.status(201).json({
//       message: "Admin created successfully",
//       adminId: result.adminId,
//     });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// LOGIN (Admin only)
export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await loginAdmin(email, password);

    if (!result.success) {
      return res.status(401).json({ message: result.message });
    }

    res.status(200).json({
      message: "Login successful",
      adminId: result.adminId,
      token: result.token,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};