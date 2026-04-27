import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

// CREATE
export const createReservation = async (data: any) => {
  return prisma.reservation.create({
    data: {
      ...data,
      bookingDate: new Date(data.bookingDate),
      status: "PENDING",
    },
  });
};

// READ ALL
export const getReservations = async () => {
  return prisma.reservation.findMany({
    orderBy: { bookingDate: "desc" },
  });
};

// READ BY ID
export const getReservationById = async (id: number) => {
  return prisma.reservation.findUnique({
    where: { id },
  });
};

// UPDATE FULL
export const updateReservation = async (id: number, data: any) => {
  return prisma.reservation.update({
    where: { id },
    data: {
      ...data,
      bookingDate: data.bookingDate
        ? new Date(data.bookingDate)
        : undefined,
    },
  });
};

// UPDATE STATUS
export const updateReservationStatus = async (
  id: number,
  status: ReservationStatus,
) => {
  return prisma.reservation.update({
    where: { id },
    data: { status },
  });
};

// DELETE
export const deleteReservation = async (id: number) => {
  return prisma.reservation.delete({
    where: { id },
  });
};