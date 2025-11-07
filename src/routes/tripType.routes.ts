import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import tripTypeController from "../controllers/tripType.controller";

const router = Router();

/**
 * TRIP TYPE ROUTES
 * Base: /api/trip-types
 */

// GET /api/trip-types - Get all active trip types (public)
router.get("/", tripTypeController.getAllTripTypes);

// GET /api/trip-types/admin/all - Get all trip types including inactive (admin only)
// IMPORTANT: This route must be BEFORE /:id to prevent interception
router.get(
  "/admin/all",
  requireAuth,
  requireAdmin,
  tripTypeController.getAllTripTypesAdmin
);

// GET /api/trip-types/slug/:slug - Get trip type by slug (public)
router.get("/slug/:slug", tripTypeController.getTripTypeBySlug);

// GET /api/trip-types/:id - Get trip type by ID (public)
// IMPORTANT: This dynamic route must be at the END of GET routes
router.get("/:id", tripTypeController.getTripTypeById);

// POST /api/trip-types - Create new trip type (admin only)
router.post("/", requireAuth, requireAdmin, tripTypeController.createTripType);

// PUT /api/trip-types/:id - Update trip type (admin only)
router.put(
  "/:id",
  requireAuth,
  requireAdmin,
  tripTypeController.updateTripType
);

// DELETE /api/trip-types/:id - Delete (soft delete) trip type (admin only)
router.delete(
  "/:id",
  requireAuth,
  requireAdmin,
  tripTypeController.deleteTripType
);

export default router;
