import { hash, compare } from "bcrypt-ts"
import { supabase } from "./db"

interface User {
  id: string
  email: string
  name: string
  password: string
  isPrime: boolean
  createdAt: string
}

function mapRow(row: any): User {
  return {
    id: row.id.toString(),
    email: row.email,
    name: row.name,
    password: row.password,
    isPrime: row.is_prime,
    createdAt: row.created_at,
  }
}

export const userService = {
  async findUnique(where: { email: string }): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, name, password, is_prime, created_at")
        .eq("email", where.email)
        .maybeSingle()

      if (error) {
        console.error("Error finding user:", error)
        return null
      }
      if (!data) return null

      return mapRow(data)
    } catch (error) {
      console.error("Error finding user:", error)
      return null
    }
  },

  async create(data: {
    email: string
    name: string
    password: string
    isPrime?: boolean
  }): Promise<User> {
    try {
      const hashedPassword = await hash(data.password, 5)
      const isPrime = data.isPrime ?? false

      const { data: row, error } = await supabase
        .from("users")
        .insert({
          email: data.email,
          name: data.name,
          password: hashedPassword,
          is_prime: isPrime,
        })
        .select("id, email, name, password, is_prime, created_at")
        .single()

      if (error) throw error
      if (!row) throw new Error("Failed to create user")

      return mapRow(row)
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  },

  async update(id: string, data: Partial<User>): Promise<User | null> {
    try {
      const updates: Record<string, any> = {}
      if (data.isPrime !== undefined) updates.is_prime = data.isPrime
      if (data.name !== undefined) updates.name = data.name
      if (data.password !== undefined) updates.password = data.password

      if (Object.keys(updates).length === 0) {
        return await this.findUniqueById(id)
      }

      updates.updated_at = new Date().toISOString()

      const { data: row, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select("id, email, name, password, is_prime, created_at")
        .single()

      if (error) throw error
      if (!row) return null

      return mapRow(row)
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  },

  async findUniqueById(id: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, name, password, is_prime, created_at")
        .eq("id", id)
        .maybeSingle()

      if (error) {
        console.error("Error finding user by ID:", error)
        return null
      }
      if (!data) return null

      return mapRow(data)
    } catch (error) {
      console.error("Error finding user by ID:", error)
      return null
    }
  },
}