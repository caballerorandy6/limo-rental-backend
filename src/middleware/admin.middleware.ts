import { Request, Response, NextFunction } from "express";

/**
 * Middleware para verificar que el usuario tiene rol de administrador
 * Debe usarse DESPUÉS de requireAuth
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verificar que el usuario esté autenticado
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }

  // Verificar que el usuario tenga rol de admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Forbidden",
      message: "Administrator access required",
    });
  }

  next();
};
