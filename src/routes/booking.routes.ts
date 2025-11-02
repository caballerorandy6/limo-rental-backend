import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
// import bookingController from "../controllers/booking.controller";

const router = Router();

/**
 * RUTAS DE RESERVACIONES
 * Base: /api/bookings
 */

// GET /api/bookings - Obtener todas las reservaciones (solo admin)
// router.get("/", requireAuth, requireAdmin, bookingController.getAllBookings);

// GET /api/bookings/number/:bookingNumber - Obtener por número de reservación (usuario autenticado)
// router.get("/number/:bookingNumber", requireAuth, bookingController.getBookingByNumber);

// GET /api/bookings/:id - Obtener una reservación por ID (usuario autenticado)
// router.get("/:id", requireAuth, bookingController.getBookingById);

// POST /api/bookings - Crear nueva reservación (usuario autenticado)
// router.post("/", requireAuth, bookingController.createBooking);

// PUT /api/bookings/:id - Actualizar reservación (solo admin)
// router.put("/:id", requireAuth, requireAdmin, bookingController.updateBooking);

// PATCH /api/bookings/:id/status - Cambiar estado de reservación (solo admin)
// router.patch("/:id/status", requireAuth, requireAdmin, bookingController.updateBookingStatus);

// DELETE /api/bookings/:id - Cancelar reservación (solo admin)
// router.delete("/:id", requireAuth, requireAdmin, bookingController.deleteBooking);

export default router;
