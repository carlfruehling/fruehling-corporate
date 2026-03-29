import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Über Carl Fruehling | Expertise in Operational Due Diligence",
  description:
    "Carl Fruehling: Hintergrund, Erfahrung und Spezialisierung auf Operational Due Diligence für mittelständische Unternehmen.",
  keywords: [
    "Carl Fruehling",
    "Operational Due Diligence Experte",
    "Due Diligence Berater Hamburg",
    "Mittelstand Beratung",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Über Carl Fruehling | Expertise in Operational Due Diligence",
    description:
      "Carl Fruehling: Hintergrund, Erfahrung und Spezialisierung auf Operational Due Diligence für mittelständische Unternehmen.",
    url: "https://fruehling-corporate.de/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10 border-l-4 border-accent pl-6 sm:pl-8">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Über mich
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Carl Fruehling
          </h1>
        </div>
        <div className="shrink-0">
          <Image
            src="/Carl-Fruehling.jpg"
            alt="Carl Fruehling"
            width={160}
            height={200}
            className="rounded-xl object-cover object-top shadow-sm"
            priority
          />
        </div>
      </header>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Hintergrund
        </h2>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          Platzhalter – hier kannst du deinen beruflichen Werdegang,
          Ausbildung und relevante Stationen beschreiben.
        </p>
      </section>

      <section className="rounded-xl border border-border bg-surface p-7 sm:p-8 space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Motivation
        </h2>
        <p className="max-w-3xl leading-8 text-muted-foreground">
          Platzhalter – warum Due Diligence im Mittelstand, was dich dazu
          bewogen hat und welchen Mehrwert du für deine Mandanten schaffen
          möchtest.
        </p>
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
            Schreiben Sie mir gerne.
          </Link>
        </p>
      </section>
    </div>
  );
}
