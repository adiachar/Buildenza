import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use service role key server-side to bypass RLS
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

// Legacy helper kept for compatibility — wraps supabase queries behind a familiar interface
export async function query(text: string, params?: any[]) {
  console.warn("query() called with raw SQL — use supabase client directly instead")
  throw new Error("Raw SQL not supported in Cloudflare edge. Use supabase client.")
}

export default supabase
