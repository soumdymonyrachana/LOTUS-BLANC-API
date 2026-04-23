import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// ======================
// GET ALL DISHES
// ======================
export const getAllDishes = async () => {
    return prisma.dish.findMany({
        where: {
            isDeleted: false
        },
        include: { category: true }
    });
};
// ======================
// GET DISH BY ID
// ======================
export const getDishById = async (id) => {
    return prisma.dish.findFirst({
        where: {
            id,
            isDeleted: false
        },
        include: { category: true }
    });
};
// ======================
// CREATE DISH
// ======================
export const createDish = async (data) => {
    return prisma.dish.create({
        data,
        include: { category: true }
    });
};
// ======================
// UPDATE DISH
// ======================
export const updateDish = async (id, data) => {
    const dish = await prisma.dish.findUnique({
        where: { id }
    });
    if (!dish || dish.isDeleted) {
        throw new Error("Dish not found");
    }
    return prisma.dish.update({
        where: { id },
        data,
        include: { category: true }
    });
};
// ======================
// DELETE DISH (SOFT DELETE)
// ======================
export const deleteDish = async (id) => {
    const dish = await prisma.dish.findUnique({
        where: { id }
    });
    if (!dish || dish.isDeleted) {
        throw new Error("Dish not found");
    }
    return prisma.dish.update({
        where: { id },
        data: {
            isDeleted: true
        },
        include: { category: true }
    });
};
//# sourceMappingURL=dishService.js.map