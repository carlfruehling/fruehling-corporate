import type { Metadata } from "next";
import { UserRound, UserRoundCog, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const approachPoints = [
  {
    icon: "operations",
    title: "Operative Bewertung",
    text: "Prüfung von Prozessen, Organisation, Abhängigkeiten und Skalierbarkeit.",
  },
  {
    icon: "risk",
    title: "Risikenanalyse",
    text: "Einschätzung von operativen Risiken, Strukturen und Reserven.",
  },
  {
    icon: "measures",
    title: "Maßnahmenempfehlungen",
    text: "Bewertung von Maschinenpark, Investionsbedarfen und Hebeln.",
  },
];

const targetGroups = [
  {
    icon: "investor",
    title: "Investoren",
    text: "Transparenz zu operativen Chancen und Risikotreibern vor dem Abschluss.",
  },
  {
    icon: "owner",
    title: "Unternehmer",
    text: "Klare Bewertung von Strukturen, Leistung und Entwicklungspotenzial.",
  },
  {
    icon: "successor",
    title: "Nachfolger",
    text: "Belastbare Entscheidungsgrundlagen für eine sichere Übergabephase.",
  },
];

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
    "Fruehling Corporate",
    "Fruehling Corporate GmbH"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Operational Due Diligence für mittelständische Unternehmen",
    description:
      "Analyse von Chancen und Risiken bei Unternehmensübernahmen im Mittelstand.",
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
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="relative h-[46vh] min-h-85 sm:h-[56vh] sm:min-h-115">
          <Image
            src="/BannerClean.png"
            alt="Produktionshalle mit Robotik-Armen"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-900/28 to-slate-950/44" />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-7 sm:px-10 lg:px-12">
              <p className="max-w-5xl text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] sm:text-6xl lg:text-7xl">
                Fruehling Corporate GmbH
              </p>
              <p className="mt-5 max-w-5xl text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] sm:text-4xl">
                Unternehmensnachfolge • Operational Due Diligence • Strategic Negotiation
              </p>
              <p className="mt-3 max-w-5xl text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] sm:text-4xl">
                Risiken erkennen • Effizienz steigern • Margen sichern
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          +++ Unternehmensnachfolge / Management-Buy-In +++
        </h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          KMU zur Übernahme gesucht: <br/>
          Sie möchten Ihr Unternehmen an einen externen Nachfolger übergeben und dafür einen finanzierbaren Kaufpreis erhalten? <br/> 
          Gesucht wird ein Unternehmen aus Industrie, Automatisierung, Maschinenbau, Produktion im Großraum Hamburg / Norddeutschland mit: <br/>
          <ul className="max-w-3xl list-disc pl-6 text-muted-foreground marker:text-accent">
            <li> Umsatz 1–10 Mio. € </li>
            <li> EBIT 0,1–1 Mio. € </li>
            <li> Mehr als 10 Mitarbeiter </li> 
          </ul>
          Eigenkapital für eine erfolgreiche Finanzierung der Übernahme ist vorhanden!
        </p>
        <div className="mt-6">
          <Link
            href="/about"
            className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-white! transition hover:bg-accent-strong"
          >
            Nachfolger-Profil ansehen
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Beratung
        </h2>
        <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">
          Problemstellung: Unternehmensübernahmen sind mit Unsicherheit verbunden. 
          Verdeckte Risiken in operativen Prozessen und Strukturen können Bewertung,
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
              className="rounded-xl border border-border bg-white p-6 text-center"
            >
              <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface text-accent">
                {point.icon === "operations" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="16" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="14" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
                {point.icon === "risk" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 4 20 19H4L12 4Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path d="M12 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="12" cy="17" r="1" fill="currentColor" />
                  </svg>
                )}
                {point.icon === "measures" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-9 w-9"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 15.5 9.5 10 13.5 14 20 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 12V7.5h-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                )}
              </div>
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
        <ul className="grid gap-4 md:grid-cols-3">
          {targetGroups.map((group) => (
            <li
              key={group.title}
              className="rounded-xl border border-border bg-white p-6 text-center"
            >
              <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface text-accent">
                {group.icon === "investor" && (
                  <UserRound className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
                )}
                {group.icon === "owner" && (
                  <UserRoundCog className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
                )}
                {group.icon === "successor" && (
                  <UserRoundPlus className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
                )}
              </div>
              <p className="text-lg font-semibold text-foreground">{group.title}</p>
              <p className="mt-3 leading-7 text-muted-foreground">{group.text}</p>
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
