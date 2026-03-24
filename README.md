# fruehling-corporate.de

Professionelle, minimalistische B2B-Website für Due Diligence und
Unternehmensanalyse im Mittelstand.

## Tech-Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Deployment über Vercel

## Lokale Entwicklung

1. Abhängigkeiten installieren:

	```bash
	npm install
	```

2. Umgebungsvariablen setzen (siehe `.env.example`):

	```bash
	RESEND_API_KEY=...
	CONTACT_TO_EMAIL=...
	```

3. Dev-Server starten:

	```bash
	npm run dev
	```

4. Anwendung öffnen: <http://localhost:3000>

## Kontaktformular (Resend)

Das Formular auf `/contact` sendet E-Mails serverseitig über Resend
(`POST /api/contact`).

- Absender: `Fruehling Corporate <kontakt@mail.fruehling-corporate.de>`
- Empfänger: `CONTACT_TO_EMAIL` (Fallback: `cfruehling@live.de`)

Wichtig für Produktivbetrieb:

- Domain/Absender in Resend verifizieren (`mail.fruehling-corporate.de`)
- `RESEND_API_KEY` in Vercel-Projekt-Settings hinterlegen

## Qualitätssicherung

```bash
npm run lint
npm run build
```
