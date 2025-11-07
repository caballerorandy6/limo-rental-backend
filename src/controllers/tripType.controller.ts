import { Request, Response } from "express";
import { z } from "zod";
import tripTypeService from "../services/tripType.service";

class TripTypeController {
  // Get All Trip Types (Public)
  async getAllTripTypes(req: Request, res: Response) {
    try {
      const tripTypes = await tripTypeService.getAllTripTypes();
      return res.status(200).json(tripTypes);
    } catch (error) {
      console.error("Error fetching trip types:", error);
      return res.status(500).json({ message: "Error fetching trip types" });
    }
  }

  // Get All Trip Types (Admin)
  async getAllTripTypesAdmin(req: Request, res: Response) {
    try {
      const tripTypes = await tripTypeService.getAllTripTypesAdmin();
      return res.status(200).json(tripTypes);
    } catch (error) {
      console.error("Error fetching trip types:", error);
      return res.status(500).json({ message: "Error fetching trip types" });
    }
  }

  // Get Trip Type by ID
  async getTripTypeById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tripType = await tripTypeService.getTripTypeById(id);

      if (!tripType) {
        return res.status(404).json({ message: "Trip type not found" });
      }

      return res.status(200).json(tripType);
    } catch (error) {
      console.error("Error fetching trip type:", error);
      return res.status(500).json({ message: "Error fetching trip type" });
    }
  }

  // Get Trip Type by Slug
  async getTripTypeBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const tripType = await tripTypeService.getTripTypeBySlug(slug);

      if (!tripType) {
        return res.status(404).json({ message: "Trip type not found" });
      }

      return res.status(200).json(tripType);
    } catch (error) {
      console.error("Error fetching trip type:", error);
      return res.status(500).json({ message: "Error fetching trip type" });
    }
  }

  // Create Trip Type (Admin Only)
  async createTripType(req: Request, res: Response) {
    const createTripTypeSchema = z.object({
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be URL-friendly (lowercase letters, numbers, hyphens)",
      }),
      name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .nullable(),
      isActive: z.boolean().default(true).optional(),
    });

    try {
      const validatedData = createTripTypeSchema.parse(req.body);
      const existingTripType = await tripTypeService.getTripTypeBySlug(
        validatedData.slug
      );

      if (existingTripType) {
        return res
          .status(400)
          .json({ message: "Trip type with this slug already exists" });
      }

      // Convert null to undefined for description
      const dataToCreate = {
        ...validatedData,
        description: validatedData.description ?? undefined,
      };

      const newTripType = await tripTypeService.createTripType(dataToCreate);
      return res.status(201).json(newTripType);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues,
        });
      }

      console.error("Error creating trip type:", error);
      return res.status(500).json({ message: "Error creating trip type" });
    }
  }

  // Update Trip Type (Admin Only)
  async updateTripType(req: Request, res: Response) {
    const updateTripTypeSchema = z.object({
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
          message:
            "Slug must be URL-friendly (lowercase letters, numbers, hyphens)",
        })
        .optional(),
      name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters")
        .optional(),
      description: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
        .nullable(),
      isActive: z.boolean().optional(),
    });

    try {
      const { id } = req.params;
      const validatedData = updateTripTypeSchema.parse(req.body);

      const existingTripType = await tripTypeService.getTripTypeById(id);
      if (!existingTripType) {
        return res.status(404).json({ message: "Trip type not found" });
      }

      if (validatedData.slug && validatedData.slug !== existingTripType.slug) {
        const slugExists = await tripTypeService.getTripTypeBySlug(
          validatedData.slug
        );
        if (slugExists) {
          return res
            .status(400)
            .json({ message: "Trip type with this slug already exists" });
        }
      }

      // Convert null to undefined for description
      const dataToUpdate = {
        ...validatedData,
        description: validatedData.description ?? undefined,
      };

      const updatedTripType = await tripTypeService.updateTripType(
        id,
        dataToUpdate
      );
      return res.status(200).json(updatedTripType);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Validation error",
          errors: error.issues,
        });
      }

      console.error("Error updating trip type:", error);
      return res.status(500).json({ message: "Error updating trip type" });
    }
  }

  // Delete Trip Type (Soft Delete - Admin Only)
  async deleteTripType(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const existingTripType = await tripTypeService.getTripTypeById(id);
      if (!existingTripType) {
        return res.status(404).json({ message: "Trip type not found" });
      }

      const deletedTripType = await tripTypeService.deleteTripType(id);
      return res.status(200).json({
        message: "Trip type deactivated successfully",
        tripType: deletedTripType,
      });
    } catch (error) {
      console.error("Error deleting trip type:", error);
      return res.status(500).json({ message: "Error deleting trip type" });
    }
  }
}

export default new TripTypeController();
