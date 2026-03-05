const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'admin@turonmun.uz',
    password: 'password123'
  });
  
  if (authErr) {
    console.log("Auth error:", authErr.message);
    return;
  }
  
  // Try inserting with Postgres user
  const { data, error } = await supabase.from('admin_users').insert({
    // no id provided, let supabase default
    email: 'test_admin_schema@example.com',
    full_name: 'test',
    role: 'chair',
    committee_id: null,
    password_hash: 'managed_by_auth',
    is_active: true
  }).select();
  
  if (error) {
     console.log("Insert Error without ID:", error);
  } else {
     console.log("Success without ID:", data);
     await supabase.from('admin_users').delete().eq('id', data[0].id);
  }
}
test();
