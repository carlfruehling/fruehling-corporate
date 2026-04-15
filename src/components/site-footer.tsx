import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-2">
          <p>© {new Date().getFullYear()} Fruehling Corporate GmbH</p>
        </div>
        <nav aria-label="Rechtliches">
          <ul className="flex flex-wrap gap-4">
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
