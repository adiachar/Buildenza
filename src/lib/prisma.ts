import { PrismaClient } from "@prisma/client/edge"

const connectionString = `${process.env.DATABASE_URL}`
console.log("Initializing Prisma with database URL:", connectionString ? "provided" : "missing")

if (!connectionString) {
  console.error("❌ CRITICAL: DATABASE_URL environment variable is not set!")
  throw new Error("DATABASE_URL is required for database connection")
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()
console.log("✅ Prisma edge client initialized successfully")

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

