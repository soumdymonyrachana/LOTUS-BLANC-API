import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface DishInput {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
}

// ======================
// GET ALL
// ======================
export const getAllDishes = async () => {
  return prisma.dish.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

// ======================
// GET BY ID
// ======================
export const getDishById = async (id: number) => {
  return prisma.dish.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      category: true,
    },
  });
};

// ======================
// CREATE
// ======================
export const createDish = async (data: DishInput) => {
  return prisma.dish.create({
    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl: data.imageUrl,

      // ✅ FIX RELATION
      category: {
        connect: { id: Number(data.categoryId) },
      },
    },
    include: {
      category: true,
    },
  });
};

// ======================
// UPDATE (PUT)
// ======================
export const updateDish = async (id: number, data: any) => {
  return prisma.dish.update({
    where: { id },

    data: {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      imageUrl: data.imageUrl,

      category: data.categoryId
        ? {
            connect: { id: Number(data.categoryId) },
          }
        : undefined,
    },

    include: {
      category: true,
    },
  });
};

// ======================
// PATCH (SAFE VERSION)
// ======================
export const patchDish = async (id: number, data: any) => {
  const exist = await prisma.dish.findUnique({
    where: { id },
  });

  if (!exist) throw new Error("Dish not found");

  return prisma.dish.update({
    where: { id },

    data: {
      name: data.name ?? undefined,
      description: data.description ?? undefined,
      price: data.price !== undefined ? Number(data.price) : undefined,
      imageUrl: data.imageUrl ?? undefined,

      category: data.categoryId
        ? {
            connect: { id: Number(data.categoryId) },
          }
        : undefined,
    },

    include: {
      category: true,
    },
  });
};

// ======================
// DELETE (SOFT DELETE)
// ======================
export const deleteDish = async (id: number) => {
  return prisma.dish.update({
    where: { id },

    data: {
      isDeleted: true,
    },
  });
};