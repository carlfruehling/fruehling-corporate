"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useId, useState } from "react";
import { primaryNavigation } from "@/lib/navigation";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 py-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start justify-between gap-4 sm:flex-1 sm:items-center">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
              Fruehling Corporate
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Operational Due Diligence und Bewertung von mittelständischen Unternehmen
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-border p-2 text-muted-foreground transition hover:border-foreground hover:text-foreground sm:hidden"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
        <nav
          id={menuId}
          aria-label="Hauptnavigation"
          className={`${isOpen ? "block" : "hidden"} sm:block`}
        >
          <ul className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 text-sm font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 sm:border-0 sm:bg-transparent sm:p-0">
            {primaryNavigation.map((item) => {
              const isActive = isCurrentPath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive ? "text-foreground" : "text-muted-foreground transition hover:text-foreground"}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
