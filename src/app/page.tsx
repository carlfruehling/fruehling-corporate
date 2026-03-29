import type { Metadata } from "next";
import Link from "next/link";

const approachPoints = [
  {
    title: "Operative Bewertung",
    text: "Prüfung von Prozessen, Organisation, Abhängigkeiten und Skalierbarkeit.",
  },
  {
    title: "Risikenanalyse",
    text: "Einschätzung von operativen Risiken, Strukturen und Reserven.",
  },
  {
    title: "Maßnahmenempfehlungen",
    text: "Bewertung von Maschinenpark, Investionsbedarfen und technologischen Chancen.",
  },
];

const targetGroups = ["Investoren", "Unternehmer", "Nachfolger"];

export const metadata: Metadata = {
  title: "Operational Due Diligence für mittelständische Unternehmen",
  description:
    "Transparente Analyse von Chancen und Risiken bei Unternehmensübernahmen im Mittelstand.",
  keywords: [
    "Operational Due Diligence",
    "Due Diligence Mittelstand",
    "Unternehmenskauf Beratung",
    "M&A Mittelstand",
    "Unternehmensnachfolge Analyse",
    "Preisverhandlung OEM",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operational Due Diligence für mittelständische Unternehmen",
    description:
      "Transparente Analyse von Chancen und Risiken bei Unternehmensübernahmen im Mittelstand.",
    url: "https://fruehling-corporate.de",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Fruehling Corporate",
  url: "https://fruehling-corporate.de",
  email: "cfruehling@live.de",
  areaServed: "DE",
  knowsAbout: [
    "Operational Due Diligence",
    "Unternehmensanalyse",
    "Transaktionsberatung",
    "Unternehmensnachfolge",
  ],
};

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <section className="space-y-6 border-l-4 border-accent pl-6 sm:pl-8">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Fruehling Corporate
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Operational Due Diligence 
          <br />
          für mittelständische Unternehmen
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Transparenz bei Chancen und Risiken sowie fundierte
          Entscheidungsgrundlagen für Transaktionen und Nachfolgeprozesse.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Problemstellung
        </h2>
        <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
          Unternehmensübernahmen sind mit Unsicherheit verbunden: Verdeckte
          Risiken in operativen Prozessen und Strukturen können Bewertung,
          Integrationsfähigkeit und Transaktionssicherheit erheblich
          beeinflussen.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Ansatz
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {approachPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-xl border border-border bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 leading-7 text-muted-foreground">{point.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Zielgruppen
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {targetGroups.map((group) => (
            <li
              key={group}
              className="rounded-xl border border-border bg-white px-5 py-4 font-medium text-foreground"
            >
              {group}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Nächster Schritt
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          Bei Interesse an einem unverbindlichen Austausch zu einem konkreten
          Vorhaben freuen wir uns auf Ihre Nachricht.
        </p>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-white! transition hover:bg-accent-strong"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}
