import { Router } from "express";
// import serviceController from "../controllers/service.controller";

const router = Router();

/**
 * RUTAS DE SERVICIOS
 *
 * Endpoints a crear:
 *
 * GET    /api/services          - Obtener todos los servicios activos
 * GET    /api/services/:id      - Obtener un servicio por ID
 * GET    /api/services/slug/:slug - Obtener un servicio por slug
 * POST   /api/services          - Crear un nuevo servicio
 * PUT    /api/services/:id      - Actualizar un servicio
 * DELETE /api/services/:id      - Eliminar (soft delete) un servicio
 */

export default router;
