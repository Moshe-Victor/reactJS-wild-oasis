import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://urlemocvfelqydgwmkch.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybGVtb2N2ZmVscXlkZ3dta2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0MzEzODksImV4cCI6MjAyOTAwNzM4OX0.x61oF9IY-94sKKQ8-RB8PqrP1A9aE8R8moNQkDLGRrw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;