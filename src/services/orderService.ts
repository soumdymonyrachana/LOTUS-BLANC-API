import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createOrder = async (data: {
  customerName: string;
  phone: string;
  items: { dishId: number; quantity: number }[];
}) => {
  // Validate dishes and calculate total price
  let totalPrice = 0;
  const validatedItems = await Promise.all(
    data.items.map(async (item) => {
      const dish = await prisma.dish.findUnique({
        where: { id: item.dishId },
      });

      if (!dish) {
        throw new Error(`Dish with id ${item.dishId} not found`);
      }

      totalPrice += dish.price * item.quantity;
      return item;
    })
  );

  return await prisma.order.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      totalPrice: totalPrice,
      status: "PENDING",
      items: {
        create: validatedItems.map((item) => ({
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

// READ ALL
export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      items: {
        include: { dish: true },
      },
    },
    orderBy: {
      orderTime: "desc",
    },
  });
};

// READ ONE
export const getOrderById = async (id: number) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { dish: true },
      },
    },
  });
};

// UPDATE
export const updateOrderStatus = async (id: number, status: string) => {
  return await prisma.order.update({
    where: { id },
    data: { status },
  });
};

// DELETE
export const deleteOrder = async (id: number) => {
  // First delete all order items associated with this order
  await prisma.orderItem.deleteMany({
    where: { orderId: id },
  });

  // Then delete the order
  return await prisma.order.delete({
    where: { id },
  });
};