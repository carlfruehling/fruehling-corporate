import { NextResponse } from "next/server";
import { Resend } from "resend";
import { saveLead } from "../../../lib/lead-storage";

const FROM_EMAIL = "Fruehling Corporate <kontakt@mail.fruehling-corporate.de>";
const NOTIFICATION_EMAIL = process.env.CONTACT_TO_EMAIL ?? "cfruehling@live.de";
const DEFAULT_PLAYBOOK_PATH = "/PLAYBOOK WIN - OEM Verhandlungen meistern.pdf";

function getFirstFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[+0-9()\-\s/]{6,20}$/.test(value);
}

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
  const formData = await request.formData();

  const name = getFirstFormValue(formData, "name");
  const email = getFirstFormValue(formData, "email");
  const mobilePhone = getFirstFormValue(formData, "mobilePhone");
  const company = getFirstFormValue(formData, "company");
  const privacyAccepted = getFirstFormValue(formData, "privacyAccepted");
  const companyWebsite = getFirstFormValue(formData, "companyWebsite");

  const origin = new URL(request.url).origin;

  if (companyWebsite) {
    return NextResponse.redirect(`${origin}/downloads?status=playbook-sent`, 303);
  }

  if (
    !name ||
    !email ||
    !mobilePhone ||
    !privacyAccepted ||
    !isValidEmail(email) ||
    !isValidPhone(mobilePhone)
  ) {
    return NextResponse.redirect(
      `${origin}/downloads?status=playbook-validation-error`,
      303,
    );
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
    await resend.emails.send({
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

    await resend.emails.send({
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

    return NextResponse.redirect(`${origin}/downloads?status=playbook-sent`, 303);
  } catch {
    return NextResponse.redirect(`${origin}/downloads?status=playbook-send-error`, 303);
  }
}
