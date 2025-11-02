import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seeding...");

  // Limpiar datos existentes
  await prisma.booking.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.service.deleteMany();

  // ========== VEHÍCULOS (20 del frontend) ==========
  console.log("📦 Creando vehículos...");

  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        name: "Luxury Crossover",
        quantityPassengers: 3,
        quantityBaggage: 3,
        description: "The Lincoln Aviator is a three-row SUV, perfect for any excursion in comfort. Ideal for 2–3 passengers, it offers ample luggage space for up to 4–5 suitcases, luxurious leather seating, and a comfortable, spacious interior.",
        pricePerHour: 50,
        pricePerMile: 2,
        images: ["/fleet/vehicle1.webp", "/fleet/vehicle2.webp", "/fleet/vehicle3.webp", "/fleet/vehicle4.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "SUV Escalade",
        quantityPassengers: 5,
        quantityBaggage: 5,
        description: "The Cadillac Escalade SUV is the ultimate luxury ride, combining the latest in technology and safety with exceptional passenger comfort. With seating for up to six passengers and ample luggage space for six bags, it is perfect for a night out on the town, special occasions, weddings, airport transfers, traveling conventions, and executive transportation.",
        pricePerHour: 60,
        pricePerMile: 2,
        images: ["/fleet/vehicle5.webp", "/fleet/vehicle6.webp", "/fleet/vehicle7.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Sprinter Van Mercedes Benz",
        quantityPassengers: 13,
        quantityBaggage: 20,
        description: "The Sprinter Van is a stylish and versatile passenger van designed for any event, offering ample comfort, generous luggage space, and a smooth ride. With a 13-passenger capacity, a modern interior, a premium sound system, and USB outlets, it ensures a premium travel experience.",
        pricePerHour: 80,
        pricePerMile: 4,
        images: ["/fleet/vehicle8.webp", "/fleet/vehicle9.webp", "/fleet/vehicle10.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Mercedes Benz S Class",
        quantityPassengers: 2,
        quantityBaggage: 3,
        description: "This upscale VIP vehicle allows you to arrive in style wherever you go, combining exceptional comfort with elegance and a smooth ride. It boasts luxurious plush leather seating, a premium sound system, and four-sector climate control for a tailored experience.",
        pricePerHour: 65,
        pricePerMile: 4,
        images: ["/fleet/vehicle11.webp", "/fleet/vehicle12.webp", "/fleet/vehicle13.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Stretch Limo 8pax",
        quantityPassengers: 8,
        quantityBaggage: 3,
        description: "This stunning 8-passenger stretch limo is the perfect choice for any occasion, whether it's a wedding, a trip to entertainment venues, a wine tour, or a corporate outing. Designed for luxury and convenience, it includes waters, sodas, ice, cups, and napkins, as well as luxury seating, LED lighting, a premium sound system, and a minibar.",
        pricePerHour: 80,
        pricePerMile: 4,
        images: ["/fleet/vehicle14.webp", "/fleet/vehicle15.webp", "/fleet/vehicle16.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Sprinter Limo 12 passenger",
        quantityPassengers: 12,
        quantityBaggage: 10,
        description: "Our party bus redefines luxury, offering unmatched amenities for your next big event—it's like a luxury hotel on wheels! The Sprinter Limo features waters, sodas, ice, cups, and napkins, along with a minibar stocked with refreshments, ensuring a premium experience.",
        pricePerHour: 100,
        pricePerMile: 5,
        images: ["/fleet/vehicle17.webp", "/fleet/vehicle18.webp", "/fleet/vehicle19.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Sprinter Jet 9+1",
        quantityPassengers: 9,
        quantityBaggage: 0,
        description: "The Sprinter Jet 9+1 is the epitome of luxury and convenience, designed to elevate your travel experience. This high-end, 9-passenger van combines modern style with superior comfort, offering ample space and top-tier amenities for both relaxation and productivity.",
        pricePerHour: 100,
        pricePerMile: 5,
        images: ["/fleet/vehicle20.webp", "/fleet/vehicle21.webp", "/fleet/vehicle22.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Sprinter Exec",
        quantityPassengers: 13,
        quantityBaggage: 12,
        description: "American Transportation is proud to offer the Ultimate Corporate Transportation Vehicle, an upscale VIP shuttle that sets the standard for luxury group transportation. This elite vehicle is equipped with thirteen black leather captain chairs featuring Bentley stitching, ensuring comfort and elegance throughout the ride.",
        pricePerHour: 120,
        pricePerMile: 5,
        images: ["/fleet/vehicle23.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "PartyBus 25 Pax",
        quantityPassengers: 25,
        quantityBaggage: 5,
        description: "American Transportation's state-of-the-art Limo Bus is the ultimate choice for a luxurious party on wheels, featuring top-tier audio, video, and lighting systems designed for an unforgettable experience. Perfect for larger groups and special occasions.",
        pricePerHour: 150,
        pricePerMile: 6,
        images: ["/fleet/vehicle24.webp", "/fleet/vehicle25.webp", "/fleet/vehicle26.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Rolls-Royce",
        quantityPassengers: 2,
        quantityBaggage: 0,
        description: "The 1951 Rolls Royce is the epitome of elegance, making it the perfect choice for a magical wedding day. With its timeless beauty and sophisticated design, this remarkable vehicle is sure to add a touch of class to your special occasion.",
        pricePerHour: 150,
        pricePerMile: 6,
        images: ["/fleet/vehicle27.webp", "/fleet/vehicle28.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "MiniBus 23 PAX",
        quantityPassengers: 23,
        quantityBaggage: 20,
        description: "The MiniBus 23 PAX is the ideal solution for group transportation, offering a comfortable and spacious ride for up to 23 passengers. Designed with both luxury and practicality in mind, this vehicle is perfect for corporate outings, group tours, airport transfers, or special events.",
        pricePerHour: 170,
        pricePerMile: 7,
        images: ["/fleet/vehicle29.webp", "/fleet/vehicle30.webp", "/fleet/vehicle31.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "MiniBus 26 Pax",
        quantityPassengers: 27,
        quantityBaggage: 20,
        description: "This luxurious passenger bus is the perfect choice for weddings, corporate groups, or other large events, offering an elegant interior designed for comfort, privacy, and efficiency. With wooden floors, plush chair seating, and HD TVs, every journey is an experience in luxury.",
        pricePerHour: 200,
        pricePerMile: 7,
        images: ["/fleet/vehicle32.webp", "/fleet/vehicle33.webp", "/fleet/vehicle34.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Mini Coach 38 Pax",
        quantityPassengers: 38,
        quantityBaggage: 20,
        description: "This ultra-luxurious passenger bus is designed with an elegant interior, making it the perfect choice for wedding parties, corporate groups, or other large events. It offers a seamless blend of privacy, comfort, and efficiency for transporting large groups.",
        pricePerHour: 230,
        pricePerMile: 7,
        images: ["/fleet/vehicle35.webp", "/fleet/vehicle36.webp", "/fleet/vehicle37.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "40 Pax MB",
        quantityPassengers: 40,
        quantityBaggage: 35,
        description: "This ultra-luxurious passenger bus is designed to provide the ultimate comfort and convenience for large groups, featuring a restroom for added convenience, TV and DVD player for entertainment, and Wi-Fi for seamless connectivity.",
        pricePerHour: 250,
        pricePerMile: 8,
        images: ["/fleet/vehicle38.webp", "/fleet/vehicle39.webp", "/fleet/vehicle40.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Motor Coach 57",
        quantityPassengers: 57,
        quantityBaggage: 0,
        description: "This luxurious passenger bus offers a comfortable and spacious ride for up to 57 passengers, perfect for large group transportation. Designed with both privacy and efficiency in mind, it features wooden floors, plush chair seating, and a bathroom for convenience during longer trips.",
        pricePerHour: 260,
        pricePerMile: 8,
        images: ["/fleet/vehicle41.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "PartyBus 30",
        quantityPassengers: 30,
        quantityBaggage: 0,
        description: "This luxurious party bus is the perfect choice for a night out on the town, a special event, or a celebration with friends. With a spacious interior, premium sound system, and vibrant LED lighting, it creates a lively and festive atmosphere for any occasion.",
        pricePerHour: 280,
        pricePerMile: 8,
        images: ["/fleet/vehicle42.webp", "/fleet/vehicle43.webp", "/fleet/vehicle44.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Sedan Premium",
        quantityPassengers: 3,
        quantityBaggage: 3,
        description: "This upscale VIP vehicle offers the perfect combination of luxury, comfort, and style, ensuring you arrive at any destination in elegance. With luxuriously comfortable seating, a premium sound system, and climate control, it provides an exceptional experience for every journey.",
        pricePerHour: 300,
        pricePerMile: 9,
        images: ["/fleet/vehicle45.webp", "/fleet/vehicle46.webp", "/fleet/vehicle47.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "SUV Premium",
        quantityPassengers: 5,
        quantityBaggage: 5,
        description: "The Executive Suburban is a state-of-the-art SUV designed to offer the latest in technology and safety while ensuring maximum comfort for its passengers. Whether you're heading to the airport or planning a night out on the town, this vehicle provides the perfect blend of luxury and practicality.",
        pricePerHour: 320,
        pricePerMile: 9,
        images: ["/fleet/vehicle48.webp", "/fleet/vehicle49.webp", "/fleet/vehicle50.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "Stretch Escalade Limo 18 pax",
        quantityPassengers: 18,
        quantityBaggage: 0,
        description: "American Transportation's all-new 2023 Cadillac Escalade is the most elegant and modern SUV limousine available, perfect for weddings, proms, or any special occasion. With seating for 18 adults, the Escalade offers a luxurious and spacious experience.",
        pricePerHour: 350,
        pricePerMile: 10,
        images: ["/fleet/vehicle51.webp", "/fleet/vehicle52.webp", "/fleet/vehicle53.webp"],
        isActive: true,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: "PartyBus 20 Pax",
        quantityPassengers: 20,
        quantityBaggage: 15,
        description: "American Transportation's state-of-the-art Limo Bus combines exceptional audio, video, and lighting with luxurious comfort, creating the ultimate party on wheels. This party bus is the most popular choice for special occasions, offering both style and space for larger groups who value comfort.",
        pricePerHour: 360,
        pricePerMile: 10,
        images: ["/fleet/vehicle54.webp", "/fleet/vehicle55.webp"],
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${vehicles.length} vehículos creados`);

  // ========== SERVICIOS (11 del frontend) ==========
  console.log("📦 Creando servicios...");

  const services = await Promise.all([
    prisma.service.create({
      data: {
        slug: "weddings",
        title: "Weddings",
        description: "Leave the logistics to us and focus on what matters most—celebrating love and joy on your special day.",
        image: "/service/service1.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "corporate-services",
        title: "Corporate Services",
        description: "Our professional chauffeurs are happy to pick you up and drop you off at the location of any corporate event, including one of the three local airports.",
        image: "/service/service2.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "party-bus-rentals",
        title: "Party Bus Rentals",
        description: "Our Miami party bus accommodates up to 30 passengers with side bench seating, offering music, movies, and beverages for a relaxing or lively experience.",
        image: "/service/service3.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "bachelorette-parties",
        title: "Bachelorette Parties",
        description: "Bachelor and bachelorette parties are a cherished tradition, offering soon-to-be-married individuals a final night out with their wedding party and closest friends.",
        image: "/service/service4.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "nights-on-the-town",
        title: "Nights on the Town",
        description: "With our professional chauffeurs at the wheel, you can relax and focus on creating lasting memories.",
        image: "/service/service5.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "airport-transfers",
        title: "Airport Transfers",
        description: "Looking for the best Miami airport transportation? Our local and experienced limo and MIA car service chauffeurs can help!",
        image: "/service/service6.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "global-services",
        title: "Global Services",
        description: "Travel the world effortlessly with American Transportation's global services, offering unmatched luxury, reliability, and convenience for every journey.",
        image: "/service/service7.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "travel-planning",
        title: "Travel Planning",
        description: "Let our experts manage your travel plans with precision for a seamless, stress-free journey with American Transportation.",
        image: "/service/service8.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "event-planning",
        title: "Event Planning",
        description: "From weddings and corporate events to family reunions, American Transportation provides luxury transportation services to enhance any special occasion.",
        image: "/service/service9.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "sporting-events",
        title: "Sporting Events",
        description: "Cheer on Miami sports teams in style with American Transportation's luxury vehicles and expert chauffeurs for an unmatched game day experience.",
        image: "/service/service10.webp",
        isActive: true,
      },
    }),
    prisma.service.create({
      data: {
        slug: "tours-sight-seeing",
        title: "Tours / Sight Seeing",
        description: "Explore Miami's iconic landmarks and hidden gems in comfort and style with American Transportation's expertly curated tours.",
        image: "/service/service11.webp",
        isActive: true,
      },
    }),
  ]);

  console.log(`✅ ${services.length} servicios creados`);

  console.log("\n🎉 Seeding completado exitosamente!");
  console.log(`📊 Total: ${vehicles.length} vehículos y ${services.length} servicios`);
}

main()
  .catch((e) => {
    console.error("❌ Error durante el seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
