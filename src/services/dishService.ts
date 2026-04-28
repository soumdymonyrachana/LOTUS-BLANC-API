import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface DishInput {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  categoryId: number;
}

// ======================
// HELPERS
// ======================
const validatePrice = (price: unknown): number => {
  const parsed = Number(price);

  if (isNaN(parsed) || parsed < 0) {
    throw new Error("Invalid price");
  }

  return parsed;
};

const validateCategory = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(categoryId) },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

// ======================
// GET ALL
// ======================
export const getAllDishes = async () => {
  return await prisma.dish.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      category: true,
    },
    orderBy: {
      id: "desc",
    },
  });
};

// ======================
// GET BY ID
// ======================
export const getDishById = async (id: number) => {
  if (isNaN(id)) {
    throw new Error("Invalid dish ID");
  }

  return await prisma.dish.findFirst({
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
  if (!data.name?.trim()) {
    throw new Error("Dish name is required");
  }

  if (!data.description?.trim()) {
    throw new Error("Dish description is required");
  }

  if (data.categoryId === undefined || data.categoryId === null) {
    throw new Error("Category ID is required");
  }

  const validPrice = validatePrice(data.price);

  await validateCategory(data.categoryId);

  return await prisma.dish.create({
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: validPrice,
      imageUrl: data.imageUrl || null,
      category: {
        connect: {
          id: Number(data.categoryId),
        },
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
export const updateDish = async (id: number, data: Partial<DishInput>) => {
  if (isNaN(id)) {
    throw new Error("Invalid dish ID");
  }

  const existingDish = await prisma.dish.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingDish) {
    throw new Error("Dish not found");
  }

  if (!data.name?.trim()) {
    throw new Error("Dish name is required");
  }

  if (!data.description?.trim()) {
    throw new Error("Dish description is required");
  }

  if (data.price === undefined) {
    throw new Error("Price is required");
  }

  const validPrice = validatePrice(data.price);

  if (data.categoryId !== undefined) {
    await validateCategory(data.categoryId);
  }

  return await prisma.dish.update({
    where: { id },
    data: {
      name: data.name.trim(),
      description: data.description.trim(),
      price: validPrice,
      imageUrl: data.imageUrl ?? null,
      category:
        data.categoryId !== undefined
          ? {
              connect: {
                id: Number(data.categoryId),
              },
            }
          : undefined,
    },
    include: {
      category: true,
    },
  });
};

// ======================
// PATCH
// ======================
export const patchDish = async (id: number, data: Partial<DishInput>) => {
  if (isNaN(id)) {
    throw new Error("Invalid dish ID");
  }

  const existingDish = await prisma.dish.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingDish) {
    throw new Error("Dish not found");
  }

  if (data.categoryId !== undefined) {
    await validateCategory(data.categoryId);
  }

  return await prisma.dish.update({
    where: { id },
    data: {
      name: data.name ? data.name.trim() : undefined,
      description: data.description ? data.description.trim() : undefined,
      price: data.price !== undefined ? validatePrice(data.price) : undefined,
      imageUrl: data.imageUrl !== undefined ? data.imageUrl : undefined,
      category:
        data.categoryId !== undefined
          ? {
              connect: {
                id: Number(data.categoryId),
              },
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
  if (isNaN(id)) {
    throw new Error("Invalid dish ID");
  }

  const existingDish = await prisma.dish.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!existingDish) {
    throw new Error("Dish not found");
  }

  return await prisma.dish.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};
