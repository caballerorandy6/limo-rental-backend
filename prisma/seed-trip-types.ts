import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function main() {
  console.log("🌱 Seeding Trip Types...");

  for (const tripType of tripTypes) {
    const existing = await prisma.tripType.findUnique({
      where: { slug: tripType.slug },
    });

    if (!existing) {
      await prisma.tripType.create({
        data: tripType,
      });
      console.log(`✅ Created Trip Type: ${tripType.name}`);
    } else {
      console.log(`⏭️  Trip Type already exists: ${tripType.name}`);
    }
  }

  console.log("✨ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding trip types:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
