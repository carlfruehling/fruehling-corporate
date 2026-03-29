import type { Metadata } from "next";

type ContactPageProps = {
  searchParams?: Promise<{ status?: string }> | { status?: string };
};

export const metadata: Metadata = {
  title: "Kontakt | Anfrage zur Due Diligence Beratung",
  description:
    "Kontakt für unverbindliche Anfragen zu Operational Due Diligence, Unternehmensanalyse und Transaktionsbegleitung im Mittelstand.",
  keywords: [
    "Due Diligence Kontakt",
    "Unternehmensanalyse Anfrage",
    "M&A Beratung Kontakt",
    "Due Diligence Beratung Hamburg",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Kontakt | Anfrage zur Due Diligence Beratung",
    description:
      "Kontakt für unverbindliche Anfragen zu Operational Due Diligence, Unternehmensanalyse und Transaktionsbegleitung im Mittelstand.",
    url: "https://fruehling-corporate.de/contact",
  },
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await Promise.resolve(searchParams);

  const status = params?.status;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Kontakt
        </h1>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          Nutzen Sie das Formular für eine unverbindliche Anfrage.
        </p>
      </header>

      {status === "sent" && (
        <p className="max-w-2xl rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Vielen Dank. Ihre Anfrage wurde erfolgreich versendet.
        </p>
      )}

      {status === "validation-error" && (
        <p className="max-w-2xl rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie die
          Datenschutzerklärung.
        </p>
      )}

      {(status === "config-error" || status === "send-error") && (
        <p className="max-w-2xl rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          Der Versand war aktuell nicht möglich. Bitte schreiben Sie uns direkt
          per E-Mail an cfruehling@live.de.
        </p>
      )}

      <form
        method="post"
        action="/api/contact"
        className="max-w-2xl space-y-5 rounded-xl border border-border bg-surface p-7"
      >
        <div className="hidden" aria-hidden="true">
          <label htmlFor="companyWebsite">Bitte leer lassen</label>
          <input
            id="companyWebsite"
            name="companyWebsite"
            type="text"
            autoComplete="off"
            tabIndex={-1}
            defaultValue=""
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm outline-none ring-accent transition focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm outline-none ring-accent transition focus:ring-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Nachricht
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full rounded-md border border-border bg-white px-3 py-2.5 text-sm outline-none ring-accent transition focus:ring-2"
          />
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
          <input
            name="privacyAccepted"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-border"
          />
          <span>
            Ich stimme der{" "}
            <a href="/datenschutz" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
              Datenschutzerklärung
            </a>{" "}
            zu.
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-white! transition hover:bg-accent-strong"
        >
          Anfrage senden
        </button>
      </form>
    </div>
  );
}
