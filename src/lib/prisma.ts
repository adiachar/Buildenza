import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

const connectionString = `${process.env.DATABASE_URL}`
console.log("Initializing Prisma with database URL:", connectionString ? "provided" : "missing")

const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false }
})
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
console.log("Prisma client initialized")

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

