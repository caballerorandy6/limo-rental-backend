import { Request, Response, NextFunction } from "express";
import { createClerkClient, verifyToken } from "@clerk/express";

// Inicializar Clerk Client con las credenciales
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

// Extender el tipo Request para incluir auth
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
      };
      user?: {
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        role: string;
      };
    }
  }
}

/**
 * Middleware para verificar que el usuario está autenticado
 * Extrae el token de Clerk del header Authorization
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "No authentication token provided",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verificar el token con Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    if (!payload || !payload.sub) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid authentication token",
      });
    }

    // Obtener información del usuario desde Clerk
    const user = await clerkClient.users.getUser(payload.sub);

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not found",
      });
    }

    // Extraer el rol desde publicMetadata
    const role = (user.publicMetadata?.role as string) || "user";

    // Adjuntar información del usuario al request
    req.auth = {
      userId: user.id,
      sessionId: payload.sid as string,
    };

    req.user = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      firstName: user.firstName,
      lastName: user.lastName,
      role: role,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication failed",
    });
  }
};
