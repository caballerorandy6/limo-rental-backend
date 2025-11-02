import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
// import serviceController from "../controllers/service.controller";

const router = Router();

/**
 * RUTAS DE SERVICIOS
 * Base: /api/services
 */

// GET /api/services - Obtener todos los servicios activos (público)
// router.get("/", serviceController.getAllServices);

// GET /api/services/slug/:slug - Obtener un servicio por slug (público)
// router.get("/slug/:slug", serviceController.getServiceBySlug);

// GET /api/services/:id - Obtener un servicio por ID (público)
// router.get("/:id", serviceController.getServiceById);

// POST /api/services - Crear un nuevo servicio (solo admin)
// router.post("/", requireAuth, requireAdmin, serviceController.createService);

// PUT /api/services/:id - Actualizar un servicio (solo admin)
// router.put("/:id", requireAuth, requireAdmin, serviceController.updateService);

// DELETE /api/services/:id - Eliminar (soft delete) un servicio (solo admin)
// router.delete("/:id", requireAuth, requireAdmin, serviceController.deleteService);

export default router;
