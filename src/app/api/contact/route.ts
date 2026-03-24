import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_EMAIL = "Fruehling Corporate <kontakt@mail.fruehling-corporate.de>";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "cfruehling@live.de";

function getFirstFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = getFirstFormValue(formData, "name");
  const email = getFirstFormValue(formData, "email");
  const message = getFirstFormValue(formData, "message");
  const privacyAccepted = getFirstFormValue(formData, "privacyAccepted");
  const companyWebsite = getFirstFormValue(formData, "companyWebsite");

  const origin = new URL(request.url).origin;

  if (companyWebsite) {
    return NextResponse.redirect(`${origin}/contact?status=sent`, 303);
  }

  if (!name || !email || !message || !privacyAccepted) {
    return NextResponse.redirect(`${origin}/contact?status=validation-error`, 303);
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.redirect(`${origin}/contact?status=config-error`, 303);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: [
        `Name: ${name}`,
        `E-Mail: ${email}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    return NextResponse.redirect(`${origin}/contact?status=sent`, 303);
  } catch {
    return NextResponse.redirect(`${origin}/contact?status=send-error`, 303);
  }
}
