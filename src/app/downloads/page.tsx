import type { Metadata } from "next";

type DownloadsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Downloads und Tools | Broschüre, Playbook und Produktions-Profit-Tool",
  description:
    "Kostenlose Downloads und Tools: Broschüre zur Operational Due Diligence, Playbook für Zulieferer und Produktions-Profit-Tool.",
  keywords: [
    "Operational Due Diligence PDF",
    "Playbook Zulieferer OEM",
    "Preisverhandlung OEM",
    "Due Diligence Broschuere",
    "Produktions-Profit-Tool",
  ],
  alternates: {
    canonical: "/downloads",
  },
  openGraph: {
    title: "Downloads und Tools | Broschüre, Playbook und Produktions-Profit-Tool",
    description:
      "Kostenlose Downloads und Tools: Broschüre zur Operational Due Diligence, Playbook für Zulieferer und Produktions-Profit-Tool.",
    url: "https://fruehling-corporate.de/downloads",
  },
};

const downloads = [
  {
    title: "Operational Due Diligence",
    description:
      "Überblick über Leistungen, Vorgehensweise und Mehrwert bei der Operational Due Diligence für mittelständische Unternehmen.",
    href: "/Operational Due Diligence_Fruehling Corporate.pdf",
    label: "Booklet herunterladen",
  },
];

export default async function DownloadsPage(props: DownloadsPageProps) {
  // 2. Warte direkt auf die searchParams
  const searchParams = await props.searchParams;
  const status = searchParams.status;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Downloads
        </h1>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          Hier finden Sie weiterführende Unterlagen zum kostenlosen Download.
        </p>
      </header>

      {status === "playbook-sent" && (
        <p className="max-w-2xl rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Vielen Dank. Das Playbook wurde soeben an Ihre E-Mail-Adresse versendet.
        </p>
      )}

      {status === "playbook-validation-error" && (
        <p className="max-w-2xl rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Bitte füllen Sie alle Pflichtfelder korrekt aus und bestätigen Sie die
          Datenschutzerklärung.
        </p>
      )}

      {(status === "playbook-config-error" || status === "playbook-send-error") && (
        <p className="max-w-2xl rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          Der Versand war aktuell nicht möglich. Bitte schreiben Sie uns direkt
          an cfruehling@live.de.
        </p>
      )}

      <ul className="space-y-4">
        {downloads.map((item) => (
          <li
            key={item.href}
            className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-7 sm:p-8"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {item.title}
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
            <a
              href={item.href}
              download
              className="inline-flex w-fit items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white! transition hover:bg-accent-strong"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Playbook WIN | Preisverhandlung mit OEMs für Zulieferer
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Wie Automobilzulieferer es schaffen, auf Augenhöhe zu verhandeln und Ihre Forderungen durchzusetzen: 
            <ul className="max-w-3xl list-disc pl-6 text-muted-foreground marker:text-accent" >
              <li>4 Hauptfehler von Zulieferern in der Verhandlung mit Automobil-OEMs </li>
              <li>3 reale Fallbeispiele wie man Marge, Respekt & Kontrolle zurückgewinnt</li>
              <li>5 Prinzipien erfolgreicher Preisverhandlung in der Serie </li>
            </ul>
            Das Playbook senden wir Ihnen nach Angabe Ihrer Kontaktdaten automatisch per E-Mail zu.
          </p>
        </div>

        <form method="post" action="/api/playbook-request" className="mt-6 space-y-5">
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-foreground">
                Unternehmen (optional)
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-Mail*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mobilePhone" className="text-sm font-medium text-foreground">
                Mobilnummer*
              </label>
              <input
                id="mobilePhone"
                name="mobilePhone"
                type="tel"
                required
                className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-foreground"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <input
              type="checkbox"
              name="privacyAccepted"
              value="yes"
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
            className="inline-flex w-fit items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white! transition hover:bg-accent-strong"
          >
            Playbook per E-Mail anfordern
          </button>
        </form>
      </section>

            <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Produktions-Profit-Tool
          </h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Bessere Preisfindung für Ihre Fertigungsaufträge im Marktvergleich: Ermitteln Sie Vollkosten, Grenzkosten, Kapazitätseffekte und den Deckungsbeitrag pro Stunde im Vergleich zu Benchmark-Aufträgen in unter 60 Sekunden. Die Nutzung des Tools ist kostenlos.
          </p>
        </div>

        <a
          href="https://production-profit-tool.fruehling-corporate.de"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white! transition hover:bg-accent-strong"
        >
          Zum Tool
        </a>
      </section>
    </div>
  );
}
