import type { Request, Response } from "express";
import { loginUser } from "../services/authService.js";

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);

  if (result.success) {
    res.status(200).json({
      message: "Login successful!",
      userId: result.userId,
      token: result.token,
    });
  } else {
    res.status(401).json({ message: result.message });
  }
};
