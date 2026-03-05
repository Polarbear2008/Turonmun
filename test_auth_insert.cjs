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

  console.log(await supabase.from('applications').update({ assigned_committee_id: null }).eq('id', 'bd4901f4-af5f-4d62-a38f-a9cb6b6cd37e').select());
}
test();
