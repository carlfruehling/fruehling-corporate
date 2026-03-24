import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Fruehling Corporate GmbH</p>
        <nav aria-label="Rechtliches">
          <ul className="flex gap-4">
            <li>
              <a
                href="https://www.linkedin.com/in/cfruehling/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-foreground"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <Link href="/impressum" className="transition hover:text-foreground">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="transition hover:text-foreground">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
