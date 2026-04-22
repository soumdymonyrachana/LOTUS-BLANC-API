import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "Admin not found" };
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return { success: true, userId: user.id, token };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};
