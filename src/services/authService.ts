import prisma from "../lib/prisma.js";

// Make sure you use the EXACT name 'loginUser' here
export const loginUser = async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
