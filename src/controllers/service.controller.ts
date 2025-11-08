import { Request, Response } from "express";
import serviceService from "../services/service.service";
import { z } from "zod";
import { Prisma } from "@prisma/client";

/**
 * SERVICE CONTROLLER
 *
 * TODO: Implementar los siguientes controladores:
 *
 * PÚBLICOS (sin autenticación):
 * 1. getAllServices(req, res) - GET /api/services
 *    - Llamar serviceService.getAllServices()
 *    - Retornar status 200 con los servicios
 *
 * 2. getServiceById(req, res) - GET /api/services/:id
 *    - Obtener id de req.params
 *    - Llamar serviceService.getServiceById(id)
 *    - Si no existe, retornar 404
 *    - Retornar status 200 con el servicio
 *
 * 3. getServiceBySlug(req, res) - GET /api/services/slug/:slug
 *    - Obtener slug de req.params
 *    - Llamar serviceService.getServiceBySlug(slug)
 *    - Si no existe, retornar 404
 *    - Retornar status 200 con el servicio
 *
 * ADMIN ONLY (requieren autenticación + admin):
 * 4. createService(req, res) - POST /api/services
 *    - Obtener datos del req.body
 *    - Validar que no exista un servicio con el mismo slug
 *    - Llamar serviceService.createService(req.body)
 *    - Retornar status 201 con el servicio creado
 *
 * 5. updateService(req, res) - PUT /api/services/:id
 *    - Obtener id de req.params y datos de req.body
 *    - Llamar serviceService.updateService(id, req.body)
 *    - Retornar status 200 con el servicio actualizado
 *
 * 6. deleteService(req, res) - DELETE /api/services/:id
 *    - Obtener id de req.params
 *    - Llamar serviceService.deleteService(id)
 *    - Retornar status 200 con mensaje de éxito
 *
 * 7. getAllServicesAdmin(req, res) - GET /api/services/admin/all
 *    - Llamar serviceService.getAllServicesAdmin()
 *    - Retornar status 200 con todos los servicios
 *
 * Recuerda:
 * - Manejar errores con try/catch
 * - Retornar mensajes claros en caso de error
 * - Usar los status codes apropiados
 */

export class ServiceController {
  // Get All Services (Public)
  async getAllServices(req: Request, res: Response) {
    try {
      const services = await serviceService.getAllServices();
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res
        .status(500)
        .json({ message: "Error fetching services" });
    }
  }

  // Get Service By ID (Public)
  async getServiceById(req: Request, res: Response) {
    try {
      const service = await serviceService.getServiceById(req.params.id);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      return res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      return res.status(500).json({ message: "Error fetching service" });
    }
  }

  // Get Service By Slug (Public)
  async getServiceBySlug(req: Request, res: Response) {
    try {
      const service = await serviceService.getServiceBySlug(req.params.slug);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      return res.status(500).json({ message: "Error fetching service" });
    }
  }

  // Create Service (Admin Only)
  async createService(req: Request, res: Response) {
    const createServiceSchema = z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be URL-friendly (lowercase letters, numbers, hyphens)",
      }),
      title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),
      description: z
        .string()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional()
        .nullable(),
      image: z.string().url({ message: "Image must be a valid URL" }).optional().nullable(),
      isActive: z.boolean().default(true).optional(),
    });

    try {
      const validatedData = createServiceSchema.parse(req.body);
      const existingService = await serviceService.getServiceBySlug(
        validatedData.slug
      );

      if (existingService) {
        return res
          .status(400)
          .json({ message: "Service with this slug already exists" });
      }

      const newService = await serviceService.createService(validatedData);
      return res.status(201).json(newService);
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues,
        });
      }

      console.error("Error creating service:", error);
      return res.status(500).json({ message: "Error creating service" });
    }
  }

  // Update Service (Admin Only)
  async updateService(req: Request, res: Response) {
    const updateServiceSchema = z.object({
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          message:
            "Slug must be URL-friendly (lowercase letters, numbers, hyphens)",
        })
        .optional(),
      title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters")
        .optional(),
      description: z
        .string()
        .max(1000, "Description cannot exceed 1000 characters")
        .optional()
        .nullable(),
      image: z.string().url({ message: "Image must be a valid URL" }).optional().nullable(),
      isActive: z.boolean().optional(),
    });

    try {
      const validatedData = updateServiceSchema.parse(req.body);

      // Verificar que el servicio exista
      const existingService = await serviceService.getServiceByIdAdmin(req.params.id);
      if (!existingService) {
        return res.status(404).json({ message: "Service not found" });
      }

      const updatedService = await serviceService.updateService(
        req.params.id,
        validatedData as Prisma.ServiceUpdateInput
      );
      return res.status(200).json(updatedService);
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues,
        });
      }

      console.error("Error updating service:", error);
      return res.status(500).json({ message: "Error updating service" });
    }
  }

  // Delete Service - Soft Delete (Admin Only)
  async deleteService(req: Request, res: Response) {
    try {
      // Verificar que el servicio exista
      const existingService = await serviceService.getServiceByIdAdmin(req.params.id);
      if (!existingService) {
        return res.status(404).json({ message: "Service not found" });
      }

      await serviceService.deleteService(req.params.id);
      return res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Error deleting service:", error);
      return res.status(500).json({ message: "Error deleting service" });
    }
  }

  // Get All Services Admin (Admin Only)
  async getAllServicesAdmin(req: Request, res: Response) {
    try {
      const services = await serviceService.getAllServicesAdmin();
      return res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Error fetching services" });
    }
  }
}

export default new ServiceController();
