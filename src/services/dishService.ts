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

// DELETE DISH
export const deleteDish = async (id: number) => {
  const dish = await prisma.dish.findUnique({
    where: { id }
  });

  if (!dish) {
    throw new Error("Dish not found");
  }

  return prisma.dish.delete({
    where: { id },
    include: { category: true }
  });
};