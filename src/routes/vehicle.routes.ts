import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller";

const router = Router();

/**
 * RUTAS DE VEHÍCULOS
 * Base: /api/vehicles
 */

// GET /api/vehicles - Obtener todos los vehículos activos
router.get("/", vehicleController.getAllVehicles);

// GET /api/vehicles/:id - Obtener un vehículo por ID
router.get("/:id", vehicleController.getVehicleById);

// POST /api/vehicles - Crear un nuevo vehículo
router.post("/", vehicleController.createVehicle);

// PUT /api/vehicles/:id - Actualizar un vehículo
router.put("/:id", vehicleController.updateVehicle);

// DELETE /api/vehicles/:id - Eliminar (soft delete) un vehículo
router.delete("/:id", vehicleController.deleteVehicle);

export default router;
