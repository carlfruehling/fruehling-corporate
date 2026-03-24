import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Angaben gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Impressum</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Angaben gemäß § 5 DDG</h2>
        <p className="leading-8 text-muted-foreground">
          Fruehling Corporate GmbH
          <br />
          Sülldorfer Landstraße 227a
          <br />
          22589 Hamburg
          <br /> <br />
          Deutschland
          <br /> <br />
          Geschäftsführer: Carl Frühling
          <br />
          Registergericht: Amtsgericht Hamburg
          <br />
          Handelsregisternummer: HRB 195704
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Kontakt</h2>
        <p className="leading-8 text-muted-foreground">
          E-Mail: cfruehling@live.de
          <br />
          Telefon: +49 (0) 40 9436 3116
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p className="leading-8 text-muted-foreground">
          Carl Frühling
          <br />
          Sülldorfer Landstraße 227a
          <br />
          22589 Hamburg
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Haftungsausschluss</h2>
        <p className="leading-8 text-muted-foreground">
          Die Inhalte dieser Website wurden sorgfältig erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch
          keine Gewähr übernommen.
        </p>
      </section>
    </div>
  );
}
