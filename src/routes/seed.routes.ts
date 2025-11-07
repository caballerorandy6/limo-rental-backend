import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Trip Types data
const tripTypes = [
  {
    slug: "point-to-point",
    name: "Point to Point",
    description: "Direct transportation from one location to another",
  },
  {
    slug: "hourly-as-directed",
    name: "Hourly/As Directed",
    description: "Hourly rental with flexible routing as directed by passenger",
  },
  {
    slug: "round-trip",
    name: "Round Trip",
    description: "Transportation to destination and return to origin",
  },
  {
    slug: "one-way-transfer",
    name: "One Way Transfer",
    description: "Single journey transfer service",
  },
  {
    slug: "charter",
    name: "Charter",
    description: "Full vehicle charter for extended periods or events",
  },
];

// TEMPORARY ENDPOINT - DELETE AFTER USE
router.post("/trip-types", async (req, res) => {
  try {
    console.log("🌱 Seeding Trip Types...");

    for (const tripType of tripTypes) {
      const existing = await prisma.tripType.findUnique({
        where: { slug: tripType.slug },
      });

      if (!existing) {
        await prisma.tripType.create({ data: tripType });
        console.log(`✅ Created Trip Type: ${tripType.name}`);
      } else {
        console.log(`⏭️  Trip Type already exists: ${tripType.name}`);
      }
    }

    res.json({
      success: true,
      message: "Trip types seeded successfully",
      count: tripTypes.length
    });
  } catch (error) {
    console.error("Error seeding trip types:", error);
    res.status(500).json({ success: false, error: "Failed to seed trip types" });
  }
});

// TEMPORARY ENDPOINT - DELETE AFTER USE
router.post("/all", async (req, res) => {
  try {
    console.log("🌱 Starting full seed...");

    // First seed trip types
    for (const tripType of tripTypes) {
      const existing = await prisma.tripType.findUnique({
        where: { slug: tripType.slug },
      });
      if (!existing) {
        await prisma.tripType.create({ data: tripType });
      }
    }

    // Note: This won't create vehicles/services to avoid running the full seed
    // Run the vehicles/services seed separately if needed

    res.json({
      success: true,
      message: "Database seeded successfully. Run vehicles/services seed if needed.",
    });
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ success: false, error: "Failed to seed database" });
  }
});

export default router;
