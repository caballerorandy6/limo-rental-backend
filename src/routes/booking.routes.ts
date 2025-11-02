import { Router } from "express";
// import bookingController from "../controllers/booking.controller";

const router = Router();

/**
 * RUTAS DE RESERVACIONES
 *
 * Endpoints a crear:
 *
 * GET    /api/bookings               - Obtener todas las reservaciones
 * GET    /api/bookings/:id           - Obtener una reservación por ID
 * GET    /api/bookings/number/:bookingNumber - Obtener por número de reservación
 * POST   /api/bookings               - Crear nueva reservación
 * PUT    /api/bookings/:id           - Actualizar reservación
 * PATCH  /api/bookings/:id/status    - Cambiar estado de reservación
 * DELETE /api/bookings/:id           - Cancelar reservación
 *
 * Tip: Incluye las relaciones con Vehicle y Service en las consultas
 */

export default router;
