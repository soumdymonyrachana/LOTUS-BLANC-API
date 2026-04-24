import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DishInput {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
}

// GET ALL DISHES
export const getAllDishes = async () => {
  return prisma.dish.findMany({
    include: { category: true }
  });
};

// GET DISH BY ID
export const getDishById = async (id: number) => {
  return prisma.dish.findUnique({
    where: { id },
    include: { category: true }
  });
};

// CREATE DISH
export const createDish = async (data: DishInput) => {
  // Validation
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    throw new Error("Name is required and must be a non-empty string");
  }
  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim() === ""
  ) {
    throw new Error("Description is required and must be a non-empty string");
  }
  if (typeof data.price !== "number" || data.price <= 0) {
    throw new Error("Price is required and must be a positive number");
  }
  if (
    !data.categoryId ||
    typeof data.categoryId !== "number" ||
    data.categoryId <= 0
  ) {
    throw new Error("CategoryId is required and must be a positive integer");
  }

  return prisma.dish.create({
    data,
    include: { category: true }
  });
};

// UPDATE DISH
export const updateDish = async (id: number, data: Partial<DishInput>) => {
  const dish = await prisma.dish.findUnique({
    where: { id }
  });

  if (!dish) {
    throw new Error("Dish not found");
  }

  return prisma.dish.update({
    where: { id },
    data,
    include: { category: true }
  });
};

// DELETE DISH (✅ FIXED)
export const deleteDish = async (id: number) => {
  const dish = await prisma.dish.findUnique({
    where: { id }
  });

  if (!dish) {
    throw new Error("Dish not found");
  }

  // 🔥 remove related order items FIRST (fix foreign key error)
  await prisma.orderItem.deleteMany({
    where: { dishId: id }
  });

  // then delete the dish
  return prisma.dish.delete({
    where: { id },
    include: { category: true }
  });
};