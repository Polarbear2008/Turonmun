const fetch = require('node-fetch');

const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ';

async function checkSchema() {
  const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
  const data = await res.json();
  const adminUsersDef = data.definitions?.admin_users;
  console.log("Admin Users Definition:", JSON.stringify(adminUsersDef, null, 2));
}

checkSchema().catch(console.error);
