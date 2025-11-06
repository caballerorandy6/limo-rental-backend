import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import serviceController from "../controllers/service.controller";

const router = Router();

/**
 * RUTAS DE SERVICIOS
 * Base: /api/services
 *
 * TODO: Descomentar las rutas cuando implementes los controladores
 */

// GET /api/services - Obtener todos los servicios activos (público)
router.get("/", serviceController.getAllServices);

// GET /api/services/admin/all - Obtener todos los servicios incluyendo inactivos (solo admin)
// IMPORTANTE: Esta ruta debe estar ANTES de /:id para que no sea interceptada
router.get("/admin/all", requireAuth, requireAdmin, serviceController.getAllServicesAdmin);

// GET /api/services/slug/:slug - Obtener un servicio por slug (público)
router.get("/slug/:slug", serviceController.getServiceBySlug);

// GET /api/services/:id - Obtener un servicio por ID (público)
// IMPORTANTE: Esta ruta con parámetro dinámico debe ir AL FINAL de los GET
router.get("/:id", serviceController.getServiceById);

// POST /api/services - Crear un nuevo servicio (solo admin)
router.post("/", requireAuth, requireAdmin, serviceController.createService);

// PUT /api/services/:id - Actualizar un servicio (solo admin)
router.put("/:id", requireAuth, requireAdmin, serviceController.updateService);

// DELETE /api/services/:id - Eliminar (soft delete) un servicio (solo admin)
router.delete("/:id", requireAuth, requireAdmin, serviceController.deleteService);

export default router;
