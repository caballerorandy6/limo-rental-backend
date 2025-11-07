import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// TEMPORARY ENDPOINT - DELETE AFTER USE
// Seeds everything: trip types, vehicles, and services
router.post("/", async (_req, res) => {
  try {
    console.log("🌱 Starting full database seed...");

    let tripTypesCount = 0;
    let vehiclesCount = 0;
    let servicesCount = 0;

    // ========== TRIP TYPES ==========
    console.log("📦 Seeding Trip Types...");
    const tripTypes = [
      { slug: "point-to-point", name: "Point to Point", description: "Direct transportation from one location to another" },
      { slug: "hourly-as-directed", name: "Hourly/As Directed", description: "Hourly rental with flexible routing as directed by passenger" },
      { slug: "round-trip", name: "Round Trip", description: "Transportation to destination and return to origin" },
      { slug: "one-way-transfer", name: "One Way Transfer", description: "Single journey transfer service" },
      { slug: "charter", name: "Charter", description: "Full vehicle charter for extended periods or events" },
    ];

    for (const tripType of tripTypes) {
      const existing = await prisma.tripType.findUnique({ where: { slug: tripType.slug } });
      if (!existing) {
        await prisma.tripType.create({ data: tripType });
        tripTypesCount++;
      }
    }

    // ========== VEHICLES ==========
    console.log("📦 Seeding Vehicles...");
    const vehicles = [
      { name: "Luxury Crossover", quantityPassengers: 3, quantityBaggage: 3, description: "The Lincoln Aviator is a three-row SUV, perfect for any excursion in comfort.", pricePerHour: 50, pricePerMile: 2, images: ["/fleet/vehicle1.webp"], isActive: true },
      { name: "SUV Escalade", quantityPassengers: 5, quantityBaggage: 5, description: "The Cadillac Escalade SUV is the ultimate luxury ride.", pricePerHour: 60, pricePerMile: 2, images: ["/fleet/vehicle5.webp"], isActive: true },
      { name: "Sprinter Van Mercedes Benz", quantityPassengers: 13, quantityBaggage: 20, description: "The Sprinter Van is a stylish and versatile passenger van.", pricePerHour: 80, pricePerMile: 4, images: ["/fleet/vehicle8.webp"], isActive: true },
      { name: "Mercedes Benz S Class", quantityPassengers: 2, quantityBaggage: 3, description: "This upscale VIP vehicle allows you to arrive in style.", pricePerHour: 65, pricePerMile: 4, images: ["/fleet/vehicle11.webp"], isActive: true },
      { name: "Stretch Limo 8pax", quantityPassengers: 8, quantityBaggage: 3, description: "This stunning 8-passenger stretch limo is the perfect choice.", pricePerHour: 80, pricePerMile: 4, images: ["/fleet/vehicle14.webp"], isActive: true },
      { name: "Sprinter Limo 12 passenger", quantityPassengers: 12, quantityBaggage: 10, description: "Our party bus redefines luxury.", pricePerHour: 100, pricePerMile: 5, images: ["/fleet/vehicle17.webp"], isActive: true },
      { name: "Sprinter Jet 9+1", quantityPassengers: 9, quantityBaggage: 0, description: "The Sprinter Jet 9+1 is the epitome of luxury.", pricePerHour: 100, pricePerMile: 5, images: ["/fleet/vehicle20.webp"], isActive: true },
      { name: "Sprinter Exec", quantityPassengers: 13, quantityBaggage: 12, description: "Ultimate Corporate Transportation Vehicle.", pricePerHour: 120, pricePerMile: 5, images: ["/fleet/vehicle23.webp"], isActive: true },
      { name: "PartyBus 25 Pax", quantityPassengers: 25, quantityBaggage: 5, description: "State-of-the-art Limo Bus for luxurious party on wheels.", pricePerHour: 150, pricePerMile: 6, images: ["/fleet/vehicle24.webp"], isActive: true },
      { name: "Rolls-Royce", quantityPassengers: 2, quantityBaggage: 0, description: "The 1951 Rolls Royce is the epitome of elegance.", pricePerHour: 150, pricePerMile: 6, images: ["/fleet/vehicle27.webp"], isActive: true },
      { name: "MiniBus 23 PAX", quantityPassengers: 23, quantityBaggage: 20, description: "Ideal solution for group transportation.", pricePerHour: 170, pricePerMile: 7, images: ["/fleet/vehicle29.webp"], isActive: true },
      { name: "MiniBus 26 Pax", quantityPassengers: 27, quantityBaggage: 20, description: "Luxurious passenger bus for weddings and corporate groups.", pricePerHour: 200, pricePerMile: 7, images: ["/fleet/vehicle32.webp"], isActive: true },
      { name: "Mini Coach 38 Pax", quantityPassengers: 38, quantityBaggage: 20, description: "Ultra-luxurious passenger bus.", pricePerHour: 230, pricePerMile: 7, images: ["/fleet/vehicle35.webp"], isActive: true },
      { name: "40 Pax MB", quantityPassengers: 40, quantityBaggage: 35, description: "Ultimate comfort for large groups.", pricePerHour: 250, pricePerMile: 8, images: ["/fleet/vehicle38.webp"], isActive: true },
      { name: "Motor Coach 57", quantityPassengers: 57, quantityBaggage: 0, description: "Luxurious passenger bus for 57 passengers.", pricePerHour: 260, pricePerMile: 8, images: ["/fleet/vehicle41.webp"], isActive: true },
      { name: "PartyBus 30", quantityPassengers: 30, quantityBaggage: 0, description: "Luxurious party bus perfect for celebrations.", pricePerHour: 280, pricePerMile: 8, images: ["/fleet/vehicle42.webp"], isActive: true },
      { name: "Sedan Premium", quantityPassengers: 3, quantityBaggage: 3, description: "Upscale VIP vehicle for luxury travel.", pricePerHour: 300, pricePerMile: 9, images: ["/fleet/vehicle45.webp"], isActive: true },
      { name: "SUV Premium", quantityPassengers: 5, quantityBaggage: 5, description: "Executive Suburban with latest technology.", pricePerHour: 320, pricePerMile: 9, images: ["/fleet/vehicle48.webp"], isActive: true },
      { name: "Stretch Escalade Limo 18 pax", quantityPassengers: 18, quantityBaggage: 0, description: "All-new 2023 Cadillac Escalade.", pricePerHour: 350, pricePerMile: 10, images: ["/fleet/vehicle51.webp"], isActive: true },
      { name: "PartyBus 20 Pax", quantityPassengers: 20, quantityBaggage: 15, description: "State-of-the-art Limo Bus with exceptional audio and video.", pricePerHour: 360, pricePerMile: 10, images: ["/fleet/vehicle54.webp"], isActive: true },
    ];

    for (const vehicle of vehicles) {
      const existing = await prisma.vehicle.findFirst({ where: { name: vehicle.name } });
      if (!existing) {
        await prisma.vehicle.create({ data: vehicle });
        vehiclesCount++;
      }
    }

    // ========== SERVICES ==========
    console.log("📦 Seeding Services...");
    const services = [
      { slug: "weddings", title: "Weddings", description: "Leave the logistics to us and focus on what matters most.", image: "/service/service1.webp", isActive: true },
      { slug: "corporate-services", title: "Corporate Services", description: "Professional chauffeurs for corporate events.", image: "/service/service2.webp", isActive: true },
      { slug: "party-bus-rentals", title: "Party Bus Rentals", description: "Miami party bus accommodates up to 30 passengers.", image: "/service/service3.webp", isActive: true },
      { slug: "bachelorette-parties", title: "Bachelorette Parties", description: "A cherished tradition for soon-to-be-married individuals.", image: "/service/service4.webp", isActive: true },
      { slug: "nights-on-the-town", title: "Nights on the Town", description: "Professional chauffeurs for memorable nights out.", image: "/service/service5.webp", isActive: true },
      { slug: "airport-transfers", title: "Airport Transfers", description: "Best Miami airport transportation service.", image: "/service/service6.webp", isActive: true },
      { slug: "global-services", title: "Global Services", description: "Travel the world with luxury and reliability.", image: "/service/service7.webp", isActive: true },
      { slug: "travel-planning", title: "Travel Planning", description: "Experts manage your travel plans with precision.", image: "/service/service8.webp", isActive: true },
      { slug: "event-planning", title: "Event Planning", description: "Luxury transportation for special occasions.", image: "/service/service9.webp", isActive: true },
      { slug: "sporting-events", title: "Sporting Events", description: "Cheer on Miami sports teams in style.", image: "/service/service10.webp", isActive: true },
      { slug: "tours-sight-seeing", title: "Tours / Sight Seeing", description: "Explore Miami's iconic landmarks in comfort.", image: "/service/service11.webp", isActive: true },
    ];

    for (const service of services) {
      const existing = await prisma.service.findUnique({ where: { slug: service.slug } });
      if (!existing) {
        await prisma.service.create({ data: service });
        servicesCount++;
      }
    }

    console.log("✅ Seed completed successfully!");
    res.json({
      success: true,
      message: "Database seeded successfully",
      created: {
        tripTypes: tripTypesCount,
        vehicles: vehiclesCount,
        services: servicesCount
      }
    });
  } catch (error: any) {
    console.error("❌ Error seeding database:", error);
    res.status(500).json({
      success: false,
      error: "Failed to seed database",
      details: error.message
    });
  }
});

export default router;
