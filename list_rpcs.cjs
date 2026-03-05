const fetch = require('node-fetch');

const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ';

async function listRPCs() {
  const res = await fetch(`${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`);
  const data = await res.json();
  // Filter paths that start with /rpc/
  const rpcs = Object.keys(data.paths || {}).filter(p => p.startsWith('/rpc/'));
  console.log("RPC endpoints:", JSON.stringify(rpcs, null, 2));
}

listRPCs().catch(console.error);
