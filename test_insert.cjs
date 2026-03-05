const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ';
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('country_assignments').insert({
    country: 'Test',
    country_name: 'Test',
    country_code: 'TES',
    committee_id: '3dc63998-8129-4c5f-8b8e-fb5de8715d93', 
    application_id: 'bd4901f4-af5f-4d62-a38f-a9cb6b6cd37e'
  });
  console.log(error);
}
test();
