import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung mit Informationen zur Verarbeitung personenbezogener Daten auf fruehling-corporate.de.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/datenschutz",
  },
  openGraph: {
    title: "Datenschutzerklärung | Fruehling Corporate",
    description:
      "Datenschutzerklärung mit Informationen zur Verarbeitung personenbezogener Daten auf fruehling-corporate.de.",
    url: "https://fruehling-corporate.de/datenschutz",
  },
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Datenschutzerklärung
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">1. Verantwortliche Stelle</h2>
        <p className="leading-8 text-muted-foreground">
          Verantwortlich für die Datenverarbeitung auf dieser Website ist die
          Fruehling Corporate GmbH (Kontaktdaten siehe Impressum).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">2. Hosting</h2>
        <p className="leading-8 text-muted-foreground">
          Diese Website wird über Vercel gehostet. Beim Aufruf der Website werden
          technisch notwendige Daten durch den Hosting-Anbieter verarbeitet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">3. Server-Logfiles</h2>
        <p className="leading-8 text-muted-foreground">
          Beim Besuch dieser Website werden automatisch Server-Logfiles erfasst,
          insbesondere IP-Adresse, Datum und Uhrzeit der Anfrage,
          Browser-Informationen sowie angeforderte Ressourcen. Die Verarbeitung
          erfolgt zur Gewährleistung von Stabilität und Sicherheit des
          Webangebots.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">4. Kontaktformular</h2>
        <p className="leading-8 text-muted-foreground">
          Bei Nutzung des Kontaktformulars werden die von Ihnen eingegebenen
          Daten (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung der Anfrage
          verarbeitet. Bei der Anforderung des Playbooks werden zusaetzlich
          Name, E-Mail-Adresse, Mobilnummer und optional Unternehmensangaben
          verarbeitet. Anfragen aus Kontakt- und Downloadformular werden in
          einer Datenbank gespeichert, um Ihre Anfrage nachvollziehbar zu
          dokumentieren und zu bearbeiten.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">5. Cookies und Tracking</h2>
        <p className="leading-8 text-muted-foreground">
          Auf dieser Website werden keine Analytics- oder Tracking-Tools
          eingesetzt. Es werden keine Marketing-Cookies und keine
          Benutzerkonten/Registrierungen angeboten.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. Ihre Rechte</h2>
        <p className="leading-8 text-muted-foreground">
          Sie haben nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung sowie
          Widerspruch. Zur Ausübung Ihrer Rechte können Sie sich über die im
          Impressum genannten Kontaktdaten an uns wenden.
        </p>
      </section>
    </div>
  );
}
