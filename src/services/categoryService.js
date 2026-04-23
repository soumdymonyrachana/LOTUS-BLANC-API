import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAllCategories = async () => {
    return await prisma.category.findMany({
        orderBy: { id: 'asc' }
    });
};
export const createCategory = async (name) => {
    return await prisma.category.create({
        data: { name }
    });
};
export const updateCategory = async (id, name) => {
    return await prisma.category.update({
        where: { id },
        data: { name }
    });
};
export const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: { id }
    });
};
//# sourceMappingURL=categoryService.js.map