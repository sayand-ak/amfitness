import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectPrisma() {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database.");
  } catch (error) {
    console.error("Failed to connect Prisma:", error);
    throw error;
  }
}

export async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected.");
  } catch (error) {
    console.error("Failed to disconnect Prisma:", error);
  }
}

export default prisma;
