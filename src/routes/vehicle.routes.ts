import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";

const router = Router();

/**
 * RUTAS DE VEHÍCULOS
 * Base: /api/vehicles
 */

// GET /api/vehicles - Obtener todos los vehículos activos (público)
router.get("/", vehicleController.getAllVehicles);

// GET /api/vehicles/:id - Obtener un vehículo por ID (público)
router.get("/:id", vehicleController.getVehicleById);

// POST /api/vehicles - Crear un nuevo vehículo (solo admin)
router.post("/", requireAuth, requireAdmin, vehicleController.createVehicle);

// PUT /api/vehicles/:id - Actualizar un vehículo (solo admin)
router.put("/:id", requireAuth, requireAdmin, vehicleController.updateVehicle);

// DELETE /api/vehicles/:id - Eliminar (soft delete) un vehículo (solo admin)
router.delete("/:id", requireAuth, requireAdmin, vehicleController.deleteVehicle);

export default router;
