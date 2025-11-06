import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

// Get all Reservations

export class BookingService {
  // Get All Bookings
  async getAllBookings() {
    const booking = await prisma.booking.findMany({
      include: { vehicle: true, service: true },
      orderBy: { createdAt: "desc" },
    });
    return booking;
  }

  // Get Booking By ID
  async getBookingById(id: string) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { vehicle: true, service: true },
    });
    return booking;
  }

  // Create Booking
  async createBooking(data: Omit<Prisma.BookingCreateInput, 'bookingNumber'>) {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const bookingNumber = `BK-${timestamp}-${randomCode}`;

    const newBooking = await prisma.booking.create({
      data: {
        ...data,
        bookingNumber,
      },
      include: { vehicle: true, service: true },
    });
    return newBooking;
  }

  // Update Booking
  async updateBooking(id: string, data: Prisma.BookingUpdateInput) {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data,
      include: { vehicle: true, service: true },
    });
    return updatedBooking;
  }

  // Delete Booking
  async deleteBooking(id: string) {
    const deleteBooking = await prisma.booking.delete({
      where: { id },
    });
    return deleteBooking;
  }

  // Get All Bookings By User
  async getAllBookingsByUser(userId: string) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { vehicle: true, service: true },
      orderBy: { createdAt: "desc" },
    });
    return bookings;
  }
}

export default new BookingService();
