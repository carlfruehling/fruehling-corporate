import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tool",
  description:
    "Weiterleitung zum interaktiven Rechentool für die Analyse von Fertigungsaufträgen.",
};

export default function ToolPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Tool</h1>
      <p className="max-w-3xl leading-8 text-muted-foreground">
        Das Rechentool ist unter der folgenden Subdomain erreichbar. Es kann ohne
        zusätzlichen Login für eine erste Analyse genutzt werden.
      </p>
      <a
        href="https://production-profit-tool.fruehling-corporate.de"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center rounded-md bg-accent px-5 py-3 text-sm font-medium !text-white transition hover:bg-accent-strong"
      >
        production-profit-tool.fruehling-corporate.de öffnen
      </a>
    </div>
  );
}
