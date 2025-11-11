import { Request, Response } from "express";
import { z } from "zod";
import { ContactStatus } from "@prisma/client";
import contactService from "../services/contact.service";

/**
 * CONTROLADOR DE CONTACTOS
 * Maneja las peticiones HTTP para el sistema de contactos
 */

export class ContactController {
  // Create Contact (Public)
  async createContact(req: Request, res: Response) {
    console.log("📧 createContact called");
    console.log("📧 Request body:", JSON.stringify(req.body, null, 2));

    const createContactSchema = z.object({
      name: z
        .string()
        .min(2, "Name is required and must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      phone: z
        .string()
        .min(10, "Please enter a valid phone number with 10 digits")
        .max(10, "Please enter a valid phone number with 10 digits"),
      message: z.string().optional(), // Opcional como en el schema de Prisma
    });

    try {
      // Validar datos con Zod
      const validatedData = createContactSchema.parse(req.body);

      // Crear contacto en DB con status NEW por defecto
      const newContact = await contactService.createContact({
        ...validatedData,
        status: ContactStatus.NEW,
      });

      res.status(201).json({
        success: true,
        message: "Contact submitted successfully",
        contact: newContact,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.issues,
        });
      }
      console.error("❌ Error in createContact:", error);
      res.status(500).json({
        success: false,
        error: "Failed to submit contact",
      });
    }
  }

  // Get All Contacts (Admin)
  async getAllContacts(req: Request, res: Response) {
    try {
      const contacts = await contactService.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("❌ Error in getAllContacts:", error);
      res.status(500).json({ error: "Failed to retrieve contacts" });
    }
  }

  // Get Contact By ID (Admin)
  async getContactById(req: Request, res: Response) {
    try {
      const contact = await contactService.getContactById(req.params.id);

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json(contact);
    } catch (error) {
      console.error("❌ Error in getContactById:", error);
      res.status(500).json({ error: "Failed to retrieve contact" });
    }
  }

  // Update Contact Status (Admin)
  async updateContactStatus(req: Request, res: Response) {
    const updateStatusSchema = z.object({
      status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"], {
        message: "Invalid status. Must be NEW, READ, REPLIED, or ARCHIVED",
      }),
    });

    try {
      const { status } = updateStatusSchema.parse(req.body);

      const updatedContact = await contactService.updateContactStatus(
        req.params.id,
        status
      );

      if (!updatedContact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({
        success: true,
        message: "Contact status updated successfully",
        contact: updatedContact,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.issues,
        });
      }
      console.error("❌ Error in updateContactStatus:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update contact status",
      });
    }
  }

  // Delete Contact (Admin)
  async deleteContact(req: Request, res: Response) {
    try {
      const deletedContact = await contactService.deleteContact(req.params.id);

      if (!deletedContact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({
        success: true,
        message: "Contact deleted successfully",
        contact: deletedContact,
      });
    } catch (error) {
      console.error("❌ Error in deleteContact:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete contact",
      });
    }
  }
}

export default new ContactController();
