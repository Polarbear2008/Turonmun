const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
// Using the service_role key to bypass RLS and read pg_policies 
// Actually we only have publishable key.
// Let's use the RPC function to get table definitions or just write a raw SQL query if they have one exposed.
console.log("no service key");
