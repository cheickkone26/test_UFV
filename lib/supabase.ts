import { createClient } from '@supabase/supabase-js'

const supabaseUrl = https://stpzshlulvqodmlikryh.supabase.co
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cHpzaGx1bHZxb2RtbGlrcnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzc2OTEsImV4cCI6MjA3Nzg1MzY5MX0.40gC6eDKCiNGtyk-JflYTJxtvXq5Tv3FjaD2PFD5cp4

export const supabase = createClient(supabaseUrl, supabaseKey)

