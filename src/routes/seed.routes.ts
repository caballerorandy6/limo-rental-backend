import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";

const router = Router();
const prisma = new PrismaClient();
const execPromise = promisify(exec);

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
router.post("/trip-types", async (_req, res) => {
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
// Executes full seed: vehicles and services
router.post("/all", async (_req, res) => {
  try {
    console.log("🌱 Starting full seed (vehicles + services)...");

    const { stdout, stderr } = await execPromise("npx ts-node prisma/seed.ts");

    if (stderr) {
      console.error("Stderr:", stderr);
    }

    console.log("Stdout:", stdout);

    res.json({
      success: true,
      message: "Vehicles and services seeded successfully",
      output: stdout
    });
  } catch (error: any) {
    console.error("Error seeding database:", error);
    res.status(500).json({
      success: false,
      error: "Failed to seed database",
      details: error.message
    });
  }
});

export default router;
