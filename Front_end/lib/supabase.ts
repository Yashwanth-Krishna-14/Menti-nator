// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient("https://csrqhzetqwzzrrrnuotk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcnFoemV0cXd6enJycm51b3RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMjU5MTUsImV4cCI6MjA1NjgwMTkxNX0._dCxw1so9NS7qbExSLi6h3RgURCUsyWUnSiQInGTYo0");
