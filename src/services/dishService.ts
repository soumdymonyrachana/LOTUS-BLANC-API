import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllDishes = async () => {
  return await prisma.dish.findMany({
    include: { category: true }, // Logic: Joins with Category table
  });
};

export const createDish = async (data: {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
}) => {
  return await prisma.dish.create({
    data,
    include: { category: true }
  });
};

export const updateDish = async (id: number, data: any) => {
  return await prisma.dish.update({
    where: { id },
    data,
  });
};

export const deleteDish = async (id: number) => {
  return await prisma.dish.delete({
    where: { id },
  });
};