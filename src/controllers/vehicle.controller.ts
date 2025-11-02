import { Request, Response } from "express";
import vehicleService from "../services/vehicle.service";
import { z } from "zod";

/**
 * CONTROLADOR DE VEHÍCULOS
 *
 * El controlador maneja:
 * 1. Recibir el Request (datos del cliente)
 * 2. Validar datos con Zod
 * 3. Llamar al Service para lógica de negocio
 * 4. Enviar Response al cliente
 *
 * Estructura de cada método:
 *
 * async nombreMetodo(req: Request, res: Response) {
 *   try {
 *     // 1. Obtener datos del request (params, body, query)
 *     // 2. Validar con Zod (opcional pero recomendado)
 *     // 3. Llamar al service
 *     // 4. Retornar respuesta
 *     res.json(data);
 *   } catch (error) {
 *     // Manejar errores
 *     res.status(500).json({ error: "mensaje" });
 *   }
 * }
 *
 * Ejemplo de validación con Zod:
 *
 * const createVehicleSchema = z.object({
 *   name: z.string().min(1),
 *   quantityPassengers: z.number().int().positive(),
 *   quantityBaggage: z.number().int().positive(),
 *   description: z.string(),
 *   pricePerHour: z.number().positive(),
 *   pricePerMile: z.number().positive(),
 *   images: z.array(z.string()).min(1),
 * });
 *
 * Métodos a implementar:
 * - getAll()
 * - getById()
 * - create()
 * - update()
 * - delete()
 */

export class VehicleController {
  // Get All Vehicles
  async getAllVehicles(req: Request, res: Response) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: "Error trying to get vehicles" });
    }
  }

  // Get Vehicle By ID
  async getVehicleById(req: Request, res: Response) {
    try {
      const vehicle = await vehicleService.getVehicleById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: "Error trying to get vehicle" });
    }
  }

  // Create Vehicle
  async createVehicle(req: Request, res: Response) {
    const createVehicleSchema = z.object({
      name: z.string().min(1),
      quantityPassengers: z.number().min(1),
      quantityBaggage: z.number().min(1),
      description: z.string().min(10).max(1000),
      pricePerHour: z.number().min(0).positive(),
      pricePerMile: z.number().positive(),
      images: z.array(z.string()).min(1),
      isActive: z.boolean().optional(), // Por defecto true
    });

    try {
      const validatedData = createVehicleSchema.parse(req.body);
      const newVehicle = await vehicleService.createVehicle(validatedData);
      res.status(201).json(newVehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.issues });
      } else {
        res.status(500).json({ error: "Error trying to create vehicle" });
      }
    }
  }

  // Update Vehicle
  async updateVehicle(req: Request, res: Response) {
    const updateVehicleSchema = z.object({
      name: z.string().min(1).optional(),
      quantityPassengers: z.number().min(1).optional(),
      quantityBaggage: z.number().min(1).optional(),
      description: z.string().min(10).max(1000).optional(),
      pricePerHour: z.number().positive().optional(),
      pricePerMile: z.number().positive().optional(),
      images: z.array(z.string()).min(1).optional(),
      isActive: z.boolean().optional(), // Por defecto true
    });
    try {
      const validatedData = updateVehicleSchema.parse(req.body);
      const updatedVehicle = await vehicleService.updateVehicle(
        req.params.id,
        validatedData
      );
      res.json(updatedVehicle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ error: "Validation failed", details: error.issues });
      }
      res.status(500).json({ error: "Error trying to update vehicle" });
    }
  }

  // Delete Vehicle (Soft Delete)
  async deleteVehicle(req: Request, res: Response) {
    try {
      const deletedVehicle = await vehicleService.deleteVehicle(req.params.id)
      res.json(deletedVehicle);
    } catch (error) {
      res.status(500).json({ error: "Error trying to delete vehicle" });
    }
  }
}

export default new VehicleController();
