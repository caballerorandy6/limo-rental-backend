import { Request, Response } from "express";
import bookingService from "../services/booking.service";
import { z } from "zod";
import { Prisma } from "@prisma/client";




export class BookingController {
  // Get All Bookings
  async getAllBookings(req: Request, res: Response) {
    try {
      const bookings = await bookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve bookings" });
    }
  }

  // Get Booking By ID
  async getBookingById(req: Request, res: Response) {
    try {
      const booking = await bookingService.getBookingById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve booking" });
    }
  }

  // Create Booking
  async createBooking(req: Request, res: Response) {
    const createBookingSchema = z.object({
      // Contact Info
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().min(1, "Phone number is required"),

      // Trip Details
      pickUpLocation: z.string().min(1, "Pick-up location is required"),
      dropOffLocation: z.string().min(1, "Drop-off location is required"),
      stops: z.array(z.string()).default([]),
      dateOfService: z.coerce.date(),
      pickUpTime: z.string().min(1, "Pick-up time is required"),

      // Round Trip (optional)
      roundTrip: z.boolean().default(false),
      returnDate: z.coerce.date().optional().nullable(),
      returnTime: z.string().optional().nullable(),

      // Trip & Service Details
      tripTypeId: z.string().min(1, "Trip type is required"),
      passengers: z.number().int().positive("At least 1 passenger required"),

      // Vehicle & Service
      vehicleId: z.string().min(1, "Vehicle ID is required"),
      serviceId: z.string().optional().nullable(),

      // Add-ons
      childSeat: z.boolean().default(false),
      meetGreet: z.boolean().default(false),
      champagne: z.boolean().default(false),
      addOnsTotal: z.number().nonnegative().default(0),

      // Pricing & Distance
      distance: z.number().nonnegative().optional().nullable(),
      duration: z.number().int().nonnegative().optional().nullable(),
      totalPrice: z.number().positive("Total price must be greater than 0"),

      // Special Instructions
      specialInstructions: z.string().optional().nullable(),
    });

    try {
      const validatedData = createBookingSchema.parse(req.body);
      const bookingData: Omit<Prisma.BookingCreateInput, "bookingNumber"> = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        pickUpLocation: validatedData.pickUpLocation,
        dropOffLocation: validatedData.dropOffLocation,
        stops: validatedData.stops,
        dateOfService: validatedData.dateOfService,
        pickUpTime: validatedData.pickUpTime,
        roundTrip: validatedData.roundTrip,
        returnDate: validatedData.returnDate,
        returnTime: validatedData.returnTime,
        passengers: validatedData.passengers,
        childSeat: validatedData.childSeat,
        meetGreet: validatedData.meetGreet,
        champagne: validatedData.champagne,
        addOnsTotal: validatedData.addOnsTotal,
        distance: validatedData.distance,
        duration: validatedData.duration,
        totalPrice: validatedData.totalPrice,
        specialInstructions: validatedData.specialInstructions,
        vehicle: {
          connect: { id: validatedData.vehicleId },
        },
        tripType: {
          connect: { id: validatedData.tripTypeId },
        },
        service: validatedData.serviceId
          ? {
              connect: { id: validatedData.serviceId },
            }
          : undefined,
      };
      const newBooking = await bookingService.createBooking(bookingData);
      res.status(201).json(newBooking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  }

  // Update Booking
  async updateBooking(req: Request, res: Response) {
    try {
      const updateBookingSchema = z.object({
        status: z
          .enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"])
          .optional(),
        specialInstructions: z.string().optional().nullable(),
      });
      const validatedData = updateBookingSchema.parse(req.body);
      const updatedBooking = await bookingService.updateBooking(
        req.params.id,
        validatedData
      );
      if (!updatedBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(updatedBooking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues });
      }
      res.status(500).json({ error: "Failed to update booking" });
    }
  }

  // Delete Booking
  async deleteBooking(req: Request, res: Response) {
    try {
      const deletedBooking = await bookingService.deleteBooking(req.params.id);
      res.json(deletedBooking);
    } catch (error) {
      res.status(500).json({ error: "Failed to delete booking" });
    }
  }

  // Get All Bookings By User
  async getAllBookingsByUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const bookings = await bookingService.getAllBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve bookings" });
    }
  }
}
export default new BookingController();
