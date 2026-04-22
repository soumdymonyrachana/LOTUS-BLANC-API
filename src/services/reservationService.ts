import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReservation = async (data: {
  customerName: string;
  phone: string;
  adults: number;
  children: number;
  bookingDate: string | Date;
  occasion?: string;
  notes?: string;
}) => {
  return await prisma.reservation.create({
    data: {
      ...data,
      bookingDate: new Date(data.bookingDate), // Ensure it's a Date object
    },
  });
};

export const getReservations = async () => {
  return await prisma.reservation.findMany({
    orderBy: { bookingDate: 'desc' },
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