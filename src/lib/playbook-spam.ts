import { createHmac } from "node:crypto";
import { isIP } from "node:net";

const fields = ["name", "email", "mobilePhone", "company", "privacyAccepted", "companyWebsite"] as const;

export function validatePlaybookForm(form: FormData) {
  const values: Record<string, string> = {};
  for (const key of fields) {
    const entries = form.getAll(key);
    if (entries.length > 1 || entries.some((value) => typeof value !== "string")) return null;
    values[key] = String(entries[0] ?? "").normalize("NFKC").trim();
  }
  const { name, email, mobilePhone, company, privacyAccepted, companyWebsite } = values;
  // Names are human text, never links, markup, control characters or digits.
  if (companyWebsite || privacyAccepted !== "yes" ||
      name.length < 2 || name.length > 100 ||
      !/^[\p{L}\p{M} .'’ʼ\-]+$/u.test(name) || !/\p{L}/u.test(name) ||
      /(?:https?|www|share\s*[.]?\s*google|search\s*[.]?\s*app)/i.test(name) ||
      /[\p{Cc}\p{Cf}]/u.test(name + company + email + mobilePhone) ||
      company.length > 160 || /(?:https?:|www\.|share\.google|search\.app|[<>])/i.test(company) ||
      email.length > 254 || !/^[A-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)+$/i.test(email) ||
      !/^[+0-9()\- /]{6,25}$/.test(mobilePhone) ||
      mobilePhone.replace(/\D/g, "").length < 6 || mobilePhone.replace(/\D/g, "").length > 15) return null;
  return { name, email: email.toLowerCase(), mobilePhone, company };
}

const localBuckets = new Map<string, { count: number; expires: number }>();

export async function allowPlaybookRequest(request: Request, email: string) {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  // Only trust Vercel's overwritten forwarding header, never arbitrary client headers.
  const candidate = process.env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.trim() : undefined;
  const ip = candidate && isIP(candidate) ? candidate : "unknown";
  const hash = (value: string) => createHmac("sha256", secret ?? "local-development").update(value).digest("hex");
  const keys = [hash(`ip:${ip}`), hash(`email:${email}`)];
  if (url && secret) {
    const response = await fetch(`${url}/rest/v1/rpc/claim_playbook_request`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: secret, Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ bucket_keys: keys }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Playbook rate limiter unavailable");
    const allowed: unknown = await response.json();
    if (typeof allowed !== "boolean") throw new Error("Invalid rate limiter response");
    return allowed;
  }
  // Production must never silently fall back to per-instance limits.
  if (process.env.NODE_ENV === "production") throw new Error("Playbook rate limiter not configured");
  const now = Date.now();
  for (const [key, bucket] of localBuckets) if (bucket.expires <= now) localBuckets.delete(key);
  if (localBuckets.size > 10000) return false;
  return keys.map((key, index) => {
    const bucket = localBuckets.get(key) ?? { count: 0, expires: now + 60 * 60 * 1000 };
    bucket.count++;
    localBuckets.set(key, bucket);
    return bucket.count <= (index === 0 ? 5 : 2);
  }).every(Boolean);
}
