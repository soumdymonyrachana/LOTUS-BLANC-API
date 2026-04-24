import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// REGISTER ADMIN
// export const registerAdmin = async (email: string, password: string) => {
//   const existing = await prisma.admin.findUnique({
//     where: { email },
//   });

//   if (existing) {
//     return { success: false, message: "Admin already exists" };
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const admin = await prisma.admin.create({
//     data: {
//       email,
//       password: hashedPassword,
//     },
//   });

//   return {
//     success: true,
//     adminId: admin.id,
//   };
// };

// LOGIN ADMIN (Admin-only authentication)
export const loginAdmin = async (email: string, password: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, message: "Admin not found" };
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password" };
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return {
      success: true,
      adminId: admin.id,
      token,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internal server error" };
  }
};