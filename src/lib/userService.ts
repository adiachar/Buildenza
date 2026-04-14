import { hash, compare } from "bcrypt-ts"
import fs from "fs"
import path from "path"

interface User {
  id: string
  email: string
  name: string
  password: string
  isPrime: boolean
  createdAt: string
}

const USERS_FILE = path.join(process.cwd(), "users.json")

// In-memory storage for development
let users: User[] = []

// Load users from file if it exists
if (fs.existsSync(USERS_FILE)) {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8")
    users = JSON.parse(data)
  } catch (error) {
    console.warn("Failed to load users from file:", error)
  }
}

// Save users to file
const saveUsers = () => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error("Failed to save users:", error)
  }
}

export const userService = {
  async findUnique(where: { email: string }) {
    return users.find(user => user.email === where.email) || null
  },

  async create(data: { email: string; name: string; password: string; isPrime?: boolean }) {
    const hashedPassword = await hash(data.password, 10)
    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      password: hashedPassword,
      isPrime: data.isPrime ?? false,
      createdAt: new Date().toISOString()
    }

    users.push(user)
    saveUsers()
    return user
  },

  async update(id: string, data: Partial<User>) {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...data }
    saveUsers()
    return users[userIndex]
  }
}