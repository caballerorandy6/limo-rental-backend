import { Request, Response } from "express";
import serviceService from "../services/service.service";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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
