import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addOrderItem = async (data: {
  orderId: number;
  dishId: number;
  quantity: number;
}) => {
  // 1. Check order exists
  const order = await prisma.order.findUnique({
    where: { id: data.orderId },
  });

  if (!order) {
    throw new Error(`Order with id ${data.orderId} not found`);
  }

  // 2. Check dish exists
  const dish = await prisma.dish.findUnique({
    where: { id: data.dishId },
  });

  if (!dish) {
    throw new Error(`Dish with id ${data.dishId} not found`);
  }

  // 3. Validate quantity
  if (data.quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  // 4. Create order item safely
  return await prisma.orderItem.create({
    data,
    include: { dish: true },
  });
};

export const updateItemQuantity = async (id: number, quantity: number) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  return await prisma.orderItem.update({
    where: { id },
    data: { quantity },
  });
};

export const removeOrderItem = async (id: number) => {
  return await prisma.orderItem.delete({
    where: { id },
  });
};