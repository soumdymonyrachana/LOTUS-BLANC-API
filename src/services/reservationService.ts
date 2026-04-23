import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Define a reusable type for the status
export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export const createReservation = async (data: {
  customerName: string;
  phone: string;
  adults: number;
  children: number;
  bookingDate: string | Date;
  time: string; // Added missing field
  occasion?: string;
  notes?: string;
}) => {
  return await prisma.reservation.create({
    data: {
      ...data,
      bookingDate: new Date(data.bookingDate),
      status: "PENDING", // Default status
    },
  });
};

export const getReservations = async () => {
  return await prisma.reservation.findMany({
    orderBy: { bookingDate: "desc" },
  });
};

export const updateReservationStatus = async (
  id: number,
  status: ReservationStatus, // Updated to use the type union
) => {
  return await prisma.reservation.update({
    where: { id },
    data: { status },
  });
};

export const deleteReservation = async (id: number) => {
  return await prisma.reservation.delete({
    where: { id },
  });
};
