import Link from "next/link";

const navigation = [
  { href: "/", label: "Start" },
  { href: "/tool", label: "Tool" },
  { href: "/contact", label: "Kontakt" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border py-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
            Fruehling Corporate
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Due Diligence und Analyse von mittelständischen Unternehmen
          </p>
        </div>
        <nav aria-label="Hauptnavigation">
          <ul className="flex flex-wrap gap-5 text-sm font-medium text-muted-foreground">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
