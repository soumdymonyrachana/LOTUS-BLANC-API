import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createOrder = async (data) => {
    // 1. Validate all dishes exist BEFORE creating order
    for (const item of data.items) {
        const dish = await prisma.dish.findUnique({
            where: { id: item.dishId },
        });
        if (!dish) {
            throw new Error(`Dish with id ${item.dishId} not found`);
        }
    }
    // 2. Create order safely
    return await prisma.order.create({
        data: {
            customerName: data.customerName,
            phone: data.phone,
            totalPrice: data.totalPrice,
            status: "PENDING",
            items: {
                create: data.items.map((item) => ({
                    dishId: item.dishId,
                    quantity: item.quantity,
                })),
            },
        },
        include: {
            items: {
                include: { dish: true },
            },
        },
    });
};
export const getAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: {
                include: { dish: true },
            },
        },
        orderBy: {
            orderTime: 'desc',
        },
    });
};
export const updateOrderStatus = async (id, status) => {
    return await prisma.order.update({
        where: { id },
        data: { status },
    });
};
//# sourceMappingURL=orderService.js.map