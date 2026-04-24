import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE
export const createOrder = async (data: {
  customerName: string;
  phone: string;
  totalPrice: number;
  items: { dishId: number; quantity: number }[];
}) => {
  // Validate dishes (parallel for performance)
  await Promise.all(
    data.items.map(async (item) => {
      const dish = await prisma.dish.findUnique({
        where: { id: item.dishId },
      });

      if (!dish) {
        throw new Error(`Dish with id ${item.dishId} not found`);
      }
    })
  );

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
  return await prisma.order.delete({
    where: { id },
  });
};