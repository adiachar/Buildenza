import { Client } from "pg"

export async function query(text: string, params?: any[]) {
  const start = Date.now()
  
  // In serverless/edge environments like Cloudflare, global network connections 
  // shouldn't be maintained across requests because the isolate can be paused, 
  // causing TCP sockets to arbitrarily die ("Connection terminated unexpectedly").
  // Because you are using Supabase pgbouncer (port 6543), establishing a fresh short connection is extremely fast.
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })

  try {
    await client.connect()
    const result = await client.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  } finally {
    // Always clean up the socket so we don't leak handlers across Edge requests
    await client.end()
  }
}

// Keeping this around just in case it's imported somewhere, though standard query() should be used.
export async function getClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  })
  await client.connect()
  return client
}

// Initialize the database schema
export async function initializeDatabase() {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_prime BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `;

    // Split queries and execute them separately
    const queries = createTableQuery
      .split(";")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)

    for (const q of queries) {
      await query(q)
    }

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    throw error
  }
}
