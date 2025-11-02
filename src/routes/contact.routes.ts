import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
// import contactController from "../controllers/contact.controller";

const router = Router();

/**
 * RUTAS DE CONTACTO
 * Base: /api/contacts
 */

// GET /api/contacts - Obtener todos los mensajes de contacto (solo admin)
// router.get("/", requireAuth, requireAdmin, contactController.getAllContacts);

// GET /api/contacts/:id - Obtener un mensaje por ID (solo admin)
// router.get("/:id", requireAuth, requireAdmin, contactController.getContactById);

// POST /api/contacts - Crear nuevo mensaje de contacto (público)
// router.post("/", contactController.createContact);

// PATCH /api/contacts/:id/status - Cambiar estado del mensaje (solo admin)
// router.patch("/:id/status", requireAuth, requireAdmin, contactController.updateContactStatus);

// DELETE /api/contacts/:id - Eliminar mensaje (solo admin)
// router.delete("/:id", requireAuth, requireAdmin, contactController.deleteContact);

export default router;
