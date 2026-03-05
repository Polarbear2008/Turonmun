const fetch = require('node-fetch');

const supabaseUrl = 'https://sasuvkcqdqmmjobmgida.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhc3V2a2NxZHFtbWpvYm1naWRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkwNTEsImV4cCI6MjA2NjEwNTA1MX0.ZbjusSyiN3kBTVM10Ws_nKoqvblBQFvy8kZE6U3IqoQ';

async function listPolicies() {
    // try to use REST RPC if there is one, or query a view if exposed.
    // the problem is we can't query pg_policies without service_role key.
    // Let me try to see if there is a custom RPC.
    const res = await fetch(`${supabaseUrl}/rest/v1/rpc/x`, {
        headers: { 'apikey': supabaseKey }
    });
    console.log(res.status, await res.text());
}
listPolicies().catch(console.error);
