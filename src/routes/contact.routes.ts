import { Router } from "express";
// import contactController from "../controllers/contact.controller";

const router = Router();

/**
 * RUTAS DE CONTACTO
 *
 * Endpoints a crear:
 *
 * GET    /api/contacts          - Obtener todos los mensajes de contacto
 * GET    /api/contacts/:id      - Obtener un mensaje por ID
 * POST   /api/contacts          - Crear nuevo mensaje de contacto
 * PATCH  /api/contacts/:id/status - Cambiar estado del mensaje (NEW, READ, REPLIED, ARCHIVED)
 * DELETE /api/contacts/:id      - Eliminar mensaje
 */

export default router;
