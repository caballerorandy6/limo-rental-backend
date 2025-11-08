import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

/**
 * SERVICE SERVICE
 *
 * TODO: Implementar los siguientes métodos:
 *
 * 1. getAllServices() - Obtener todos los servicios activos (where: { isActive: true })
 * 2. getServiceById(id: string) - Obtener un servicio por ID
 * 3. getServiceBySlug(slug: string) - Obtener un servicio por slug
 * 4. createService(data: Prisma.ServiceCreateInput) - Crear un nuevo servicio
 * 5. updateService(id: string, data: Prisma.ServiceUpdateInput) - Actualizar servicio
 * 6. deleteService(id: string) - Soft delete (isActive: false)
 * 7. getAllServicesAdmin() - Obtener todos los servicios (incluyendo inactivos) para admin
 *
 * Recuerda:
 * - Usar prisma.service para las operaciones
 * - Ordenar por createdAt: "desc"
 * - El delete es soft (solo cambiar isActive a false)
 */

export class ServiceService {
  // Get All Services (Public) - Solo servicios activos con conteo de bookings
  async getAllServices() {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return services;
  }

  // Get Service By ID (Public) - Solo si está activo
  async getServiceById(id: string) {
    const service = await prisma.service.findFirst({
      where: { id, isActive: true },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return service;
  }

  // Get Service By ID (Admin) - Incluye inactivos
  async getServiceByIdAdmin(id: string) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return service;
  }

  // Get Service By Slug (Public) - Solo si está activo
  async getServiceBySlug(slug: string) {
    const service = await prisma.service.findFirst({
      where: { slug, isActive: true },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return service;
  }

  // Create Service
  async createService(data: Prisma.ServiceCreateInput) {
    const newService = await prisma.service.create({
      data,
    });
    return newService;
  }

  // Update Service
  async updateService(id: string, data: Prisma.ServiceUpdateInput) {
    const updatedService = await prisma.service.update({
      where: { id },
      data,
    });
    return updatedService;
  }

  // Delete Service (Soft Delete)
  async deleteService(id: string) {
    const deletedService = await prisma.service.update({
      where: { id },
      data: { isActive: false },
    });
    return deletedService;
  }

  // Get All Services Admin - Incluye inactivos con conteo de bookings
  async getAllServicesAdmin() {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return services;
  }

  // Get Service with Bookings (Solo cuando realmente se necesite) - Con paginación
  async getServiceWithBookings(
    id: string,
    page: number = 1,
    limit: number = 10
  ) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        bookings: {
          take: limit,
          skip: (page - 1) * limit,
          orderBy: { createdAt: "desc" },
          include: {
            vehicle: true,
          },
        },
        _count: {
          select: { bookings: true },
        },
      },
    });
    return service;
  }
}

export default new ServiceService();
