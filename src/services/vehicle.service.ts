import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

//SE UTILIZA TIPADO DE PRISMA

/**
 * SERVICIO DE VEHÍCULOS
 *
 * El servicio maneja:
 * 1. Interacción directa con la base de datos (Prisma)
 * 2. Lógica de negocio
 * 3. Operaciones CRUD
 *
 * Prisma Client - Métodos útiles:
 *
 * - findMany()    : Obtener múltiples registros
 *
 * - findUnique()  : Obtener un registro único (por ID)
 * - create()      : Crear un registro
 * - update()      : Actualizar un registro
 * - delete()      : Eliminar un registro
 *
 * Opciones útiles:
 * - where: {}     : Filtrar registros
 * - include: {}   : Incluir relaciones
 * - orderBy: {}   : Ordenar resultados
 * - select: {}    : Seleccionar campos específicos
 *
 * Ejemplo de consulta con relaciones:
 *
 * await prisma.vehicle.findUnique({
 *   where: { id },
 *   include: {
 *     bookings: true  // Incluye todas las reservaciones del vehículo
 *   }
 * });
 *
 * Ejemplo de crear:
 *
 * await prisma.vehicle.create({
 *   data: {
 *     name: "Mercedes S-Class",
 *     quantityPassengers: 3,
 *     // ...otros campos
 *   }
 * });
 *
 * Métodos a implementar:
 * - getAllVehicles()
 * - getVehicleById(id: string)
 * - createVehicle(data: Prisma.VehicleCreateInput)
 * - updateVehicle(id: string, data: Prisma.VehicleUpdateInput)
 * - deleteVehicle(id: string) // Soft delete: actualizar isActive a false
 */

export class VehicleService {
  // Get All Vehicles (Public) - Solo vehículos activos
  async getAllVehicles() {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return vehicles;
  }

  // Get All Vehicles (Admin) - Incluye inactivos
  async getAllVehiclesAdmin() {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: "desc" },
    });
    return vehicles;
  }

  // Get Vehicle By ID (Public) - Solo si está activo
  async getVehicleById(id: string) {
    const vehicle = await prisma.vehicle.findFirst({
      where: { id, isActive: true },
    });
    return vehicle;
  }

  // Get Vehicle By ID (Admin) - Incluye inactivos con bookings
  async getVehicleByIdAdmin(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        bookings: true,
        _count: {
          select: { bookings: true },
        },
      },
    });
    return vehicle;
  }

  async createVehicle(data: Prisma.VehicleCreateInput) {
    const newVehicle = await prisma.vehicle.create({
      data,
    });
    return newVehicle;
  }

  async updateVehicle(id: string, data: Prisma.VehicleUpdateInput) {
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data,
    });
    return updatedVehicle;
  }

  async deleteVehicle(id: string) {
    const deletedVehicle = await prisma.vehicle.update({
      where: { id },
      data: { isActive: false },
    });
    return deletedVehicle;
  }
}

export default new VehicleService();
