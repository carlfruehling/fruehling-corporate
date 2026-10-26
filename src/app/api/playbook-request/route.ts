import { NextResponse } from "next/server";
import { Resend } from "resend";
import { allowPlaybookRequest, validatePlaybookForm } from "../../../lib/playbook-spam";
import { saveLead } from "../../../lib/lead-storage";

const FROM_EMAIL = "Fruehling Corporate <kontakt@mail.fruehling-corporate.de>";
const NOTIFICATION_EMAIL = process.env.CONTACT_TO_EMAIL ?? "cfruehling@live.de";
const DEFAULT_PLAYBOOK_PATH = "/PLAYBOOK WIN - OEM Verhandlungen meistern.pdf";

function getPlaybookUrl(origin: string) {
  const configuredPath = process.env.PLAYBOOK_FILE_PATH ?? DEFAULT_PLAYBOOK_PATH;

  if (
    configuredPath.startsWith("http://") ||
    configuredPath.startsWith("https://")
  ) {
    return configuredPath;
  }

  return new URL(configuredPath, origin).toString();
}

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  const redirect = (status: string) => NextResponse.redirect(origin + "/downloads?status=" + status, 303);
  let formData: FormData;
  try {
    const reader = request.body?.getReader();
    if (!reader) return redirect("playbook-validation-error");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return redirect("playbook-validation-error");
      }
      chunks.push(value);
    }
    formData = await new Response(Buffer.concat(chunks), {
      headers: { "Content-Type": request.headers.get("content-type") ?? "" },
    }).formData();
  } catch { return redirect("playbook-validation-error"); }
  const lead = validatePlaybookForm(formData);
  if (!lead) return redirect("playbook-validation-error");
  const { name, email, mobilePhone, company } = lead;
  try {
    if (!await allowPlaybookRequest(request, email)) return redirect("playbook-rate-limited");
  } catch {
    console.error("Playbook spam protection unavailable");
    return redirect("playbook-config-error");
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.redirect(`${origin}/downloads?status=playbook-config-error`, 303);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const playbookUrl = getPlaybookUrl(origin);

  try {
    await saveLead({
      source: "playbook_request",
      name,
      email,
      mobilePhone,
      company,
      privacyAccepted: true,
    });
  } catch (error) {
    console.error("Could not save playbook lead in Supabase", error);
  }

  try {
    const delivery = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      replyTo: NOTIFICATION_EMAIL,
      subject: "Ihr Playbook ist da: Preisverhandlung mit OEMs",
      text: [
        `Guten Tag ${name},`,
        "",
        "vielen Dank für Ihr Interesse an unserem Playbook.",
        "Hier können Sie es direkt herunterladen:",
        playbookUrl,
        "",
        "Wenn Sie Fragen haben, antworten Sie einfach auf diese E-Mail.",
        "",
        "Mit freundlichen Grüßen",
        "Fruehling Corporate",
      ].join("\n"),
    });

    if (delivery.error) throw new Error("Playbook delivery failed");
    const notification = await resend.emails.send({
      from: FROM_EMAIL,
      to: [NOTIFICATION_EMAIL],
      replyTo: email,
      subject: `Neue Playbook-Anfrage von ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Mobilnummer: ${mobilePhone}`,
        `Unternehmen: ${company || "-"}`,
        `Playbook-Link: ${playbookUrl}`,
        "",
        "Der Versandlink wurde automatisch versendet.",
      ].join("\n"),
    });

    if (notification.error) throw new Error("Playbook notification failed");
    return NextResponse.redirect(`${origin}/downloads?status=playbook-sent`, 303);
  } catch {
    return NextResponse.redirect(`${origin}/downloads?status=playbook-send-error`, 303);
  }
}
