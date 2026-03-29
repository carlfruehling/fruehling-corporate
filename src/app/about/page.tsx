import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über Carl Frühling | Expertise in Operational Due Diligence",
  description:
    "Carl Frühling: Hintergrund, Erfahrung und Spezialisierung auf Operational Due Diligence für mittelständische Unternehmen.",
  keywords: [
    "Carl Frühling",
    "Operational Due Diligence Experte",
    "Due Diligence Berater Hamburg",
    "Mittelstand Beratung",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Über Carl Frühling | Experte für Operational Due Diligence",
    description:
      "Carl Frühling: Hintergrund, Erfahrung und Spezialisierung auf Operational Due Diligence für mittelständische Unternehmen.",
    url: "https://fruehling-corporate.de/about",
  },
};

export default function AboutPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(320px,440px)_1fr] lg:items-start">
      <aside className="lg:sticky lg:top-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <Image
            src="/Carl-Fruehling.jpg"
            alt="Carl Frühling"
            width={880}
            height={1200}
            className="h-auto w-full object-cover object-top"
            priority
          />
        </div>
      </aside>

      <div className="space-y-6">
        <header className="space-y-3 border-l-4 border-accent pl-6 sm:pl-8">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Ihr Experte
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            M.Sc. (TUM) Carl O. R. Frühling
          </h1>
        </header>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Hintergrund
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 leading-8 text-muted-foreground marker:text-accent">
          <li>Masterstudium des Maschinenbau & Managements an der Technischen Universität München</li>
          <li>Plant Director eines Tier-1-Automobilzulieferers (&gt;300 Mitarbeitende, &gt;30 % p. a. Wachstum)</li>
          <li>Director Global Account Management mit &gt;400 Mio. EUR Umsatzverantwortung für internationale OEMs</li>
          <li>Mehrjährige Verantwortung auf Geschäftsleitungs-, Werk- und Kundenebene</li>
        </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Kernangebote
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 leading-8 text-muted-foreground marker:text-accent">
          <li>
            Operational Due Diligence: Identifikation operativer Risiken, Bewertung der Skalierbarkeit von Organisation,
            Prozessen und Kapazitäten, Quantifizierung von Value-Creation-Potenzialen.
          </li>
          <li>
            Externe Verhandlungsführung / Commercial Consulting: Strategische Begleitung von OEM- und
            Key-Account-Verhandlungen, Optimierung von Margen, Risikomanagement und Prozesssteuerung in der Serienfertigung.
          </li>
        </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Arbeitsweise
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 leading-8 text-muted-foreground marker:text-accent">
          <li>Operativ fundiert, KPI-gestützt, kurze Entscheidungsgrundlagen</li>
          <li>Fokus auf umsetzbare Maßnahmen und wirtschaftliche Wirkung</li>
          <li>Kombination von strategischer Analyse, operativer Umsetzung und Verhandlungssteuerung</li>
        </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Ergebnisse
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 leading-8 text-muted-foreground marker:text-accent">
          <li>Belastbare Entscheidungsgrundlagen für Investitionen und Transaktionen</li>
          <li>Identifizierte Risiken, Engpässe und operative Red Flags</li>
          <li>Quantifizierte Effizienz-, Kosten- und Margenpotenziale (typischerweise 10-30 %)</li>
          <li>Verbesserte Verhandlungsergebnisse bei OEMs und Key Accounts</li>
        </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Verfügbarkeit
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 leading-8 text-muted-foreground marker:text-accent">
          <li>Stunden- oder tageweise, remote oder vor Ort</li>
          <li>Industrie-, Produktions- und Automotive-Unternehmen sowie mittelständische Transaktionsziele</li>
        </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Kontakt
        </h2>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          Sie möchten mehr erfahren oder haben eine konkrete Anfrage?{" "}
          <Link
            href="/contact"
            className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition"
          >
            <br/>Nehmen Sie Kontakt auf.
          </Link>
        </p>
        </section>
      </div>
    </div>
  );
}
