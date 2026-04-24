import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReservation = async (data: {
  customerName: string;
  phone: string;
  adults: number;
  children: number;
  bookingDate: string | Date;
  time: string; // Add this
  status: string; // Add this (or a default value if defined in schema)
  occasion?: string;
  notes?: string;
}) => {
  return await prisma.reservation.create({
    data: {
      customerName: data.customerName,
      phone: data.phone,
      adults: data.adults,
      children: data.children,
      bookingDate: new Date(data.bookingDate),
      time: data.time,
      status: data.status,
      occasion: data.occasion, // Prisma handles optional fields if they are undefined
      notes: data.notes,
    },
  });
};
export const getReservations = async () => {
  return await prisma.reservation.findMany({
    orderBy: { bookingDate: "desc" },
  });
};

export const updateReservationStatus = async (id: number, status: string) => {
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
