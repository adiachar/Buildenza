import { hash, compare } from "bcrypt-ts"
import { query } from "./db"

interface User {
  id: string
  email: string
  name: string
  password: string
  isPrime: boolean
  createdAt: string
}

export const userService = {
  async findUnique(where: { email: string }): Promise<User | null> {
    try {
      const result = await query(
        "SELECT id, email, name, password, is_prime as \"isPrime\", created_at as \"createdAt\" FROM users WHERE email = $1",
        [where.email]
      )

      if (result.rows.length === 0) {
        return null
      }

      return {
        id: result.rows[0].id.toString(),
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        isPrime: result.rows[0].isPrime,
        createdAt: result.rows[0].createdAt.toISOString(),
      }
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

      const result = await query(
        "INSERT INTO users (email, name, password, is_prime) VALUES ($1, $2, $3, $4) RETURNING id, email, name, password, is_prime as \"isPrime\", created_at as \"createdAt\"",
        [data.email, data.name, hashedPassword, isPrime]
      )

      if (result.rows.length === 0) {
        throw new Error("Failed to create user")
      }

      return {
        id: result.rows[0].id.toString(),
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        isPrime: result.rows[0].isPrime,
        createdAt: result.rows[0].createdAt.toISOString(),
      }
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  },

  async update(id: string, data: Partial<User>): Promise<User | null> {
    try {
      const updates: string[] = []
      const values: any[] = [id]
      let paramCount = 2

      if (data.isPrime !== undefined) {
        updates.push(`is_prime = $${paramCount}`)
        values.push(data.isPrime)
        paramCount++
      }

      if (data.name !== undefined) {
        updates.push(`name = $${paramCount}`)
        values.push(data.name)
        paramCount++
      }

      if (data.password !== undefined) {
        updates.push(`password = $${paramCount}`)
        values.push(data.password)
        paramCount++
      }

      if (updates.length === 0) {
        return await this.findUniqueById(id)
      }

      const updateQuery = `
        UPDATE users 
        SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, email, name, password, is_prime as \"isPrime\", created_at as \"createdAt\"
      `

      const result = await query(updateQuery, values)

      if (result.rows.length === 0) {
        return null
      }

      return {
        id: result.rows[0].id.toString(),
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        isPrime: result.rows[0].isPrime,
        createdAt: result.rows[0].createdAt.toISOString(),
      }
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  },

  async findUniqueById(id: string): Promise<User | null> {
    try {
      const result = await query(
        "SELECT id, email, name, password, is_prime as \"isPrime\", created_at as \"createdAt\" FROM users WHERE id = $1",
        [id]
      )

      if (result.rows.length === 0) {
        return null
      }

      return {
        id: result.rows[0].id.toString(),
        email: result.rows[0].email,
        name: result.rows[0].name,
        password: result.rows[0].password,
        isPrime: result.rows[0].isPrime,
        createdAt: result.rows[0].createdAt.toISOString(),
      }
    } catch (error) {
      console.error("Error finding user by ID:", error)
      return null
    }
  },
}