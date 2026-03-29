type LeadSource = "contact" | "playbook_request";

type LeadPayload = {
  source: LeadSource;
  name: string;
  email: string;
  company?: string;
  message?: string;
  privacyAccepted: boolean;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

export async function saveLead(payload: LeadPayload) {
  if (!hasSupabaseConfig()) {
    return;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/inbound_leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_SERVICE_ROLE_KEY as string,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      source: payload.source,
      name: payload.name,
      email: payload.email,
      company: payload.company ?? null,
      message: payload.message ?? null,
      privacy_accepted: payload.privacyAccepted,
    }),
  });

  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status}`);
  }
}
