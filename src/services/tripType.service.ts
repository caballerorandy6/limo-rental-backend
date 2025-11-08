import prisma from "../utils/prisma";

class TripTypeService {
  // Get All Trip Types (Public) - Only active trip types
  async getAllTripTypes() {
    const tripTypes = await prisma.tripType.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return tripTypes;
  }

  // Get All Trip Types (Admin) - Including inactive
  async getAllTripTypesAdmin() {
    const tripTypes = await prisma.tripType.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return tripTypes;
  }

  // Get Trip Type by ID (Public) - Solo si está activo
  async getTripTypeById(id: string) {
    const tripType = await prisma.tripType.findFirst({
      where: { id, isActive: true },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return tripType;
  }

  // Get Trip Type by ID (Admin) - Incluye inactivos
  async getTripTypeByIdAdmin(id: string) {
    const tripType = await prisma.tripType.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return tripType;
  }

  // Get Trip Type by Slug (Public) - Solo si está activo
  async getTripTypeBySlug(slug: string) {
    const tripType = await prisma.tripType.findFirst({
      where: { slug, isActive: true },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    });
    return tripType;
  }

  // Create Trip Type
  async createTripType(data: {
    slug: string;
    name: string;
    description?: string;
    isActive?: boolean;
  }) {
    const tripType = await prisma.tripType.create({
      data,
    });
    return tripType;
  }

  // Update Trip Type
  async updateTripType(
    id: string,
    data: {
      slug?: string;
      name?: string;
      description?: string;
      isActive?: boolean;
    }
  ) {
    const tripType = await prisma.tripType.update({
      where: { id },
      data,
    });
    return tripType;
  }

  // Delete Trip Type (Soft Delete)
  async deleteTripType(id: string) {
    const tripType = await prisma.tripType.update({
      where: { id },
      data: { isActive: false },
    });
    return tripType;
  }
}

export default new TripTypeService();
