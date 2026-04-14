import { PrismaClient } from "@prisma/client/edge"

const connectionString = process.env.PRISMA_DATA_PROXY_URL || process.env.DATABASE_URL
console.log("Initializing Prisma edge client with:", process.env.PRISMA_DATA_PROXY_URL ? "PRISMA_DATA_PROXY_URL" : process.env.DATABASE_URL ? "DATABASE_URL" : "none")

if (!connectionString) {
  console.error("❌ CRITICAL: PRISMA_DATA_PROXY_URL or DATABASE_URL environment variable is not set!")
  throw new Error("PRISMA_DATA_PROXY_URL or DATABASE_URL is required for database connection")
}

if (process.env.PRISMA_DATA_PROXY_URL && !process.env.PRISMA_DATA_PROXY_URL.startsWith("prisma://")) {
  console.warn("⚠️ PRISMA_DATA_PROXY_URL should start with prisma:// for Prisma Data Proxy")
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()
console.log("✅ Prisma edge client initialized successfully")

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

