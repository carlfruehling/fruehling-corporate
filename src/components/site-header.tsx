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
    <>
      <div className="fixed top-4 right-6 z-60 sm:hidden">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background/95 p-3.5 text-muted-foreground shadow-sm backdrop-blur transition hover:border-foreground hover:text-foreground supports-backdrop-filter:bg-background/80"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>
      <header className="border-b border-border bg-background py-4 sm:sticky sm:top-0 sm:z-50 sm:bg-background/95 sm:backdrop-blur sm:supports-backdrop-filter:bg-background/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pr-20 sm:pr-0">
            <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
              Fruehling Corporate
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              Operational Due Diligence und Bewertung von mittelständischen Unternehmen
            </p>
          </div>
          <nav aria-label="Hauptnavigation" className="hidden sm:block">
            <ul className="flex flex-row flex-wrap items-center gap-5 text-sm font-medium">
              {primaryNavigation.map((item) => {
                const isActive = isCurrentPath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={isActive ? "text-foreground" : "text-muted-foreground transition hover:text-foreground"}
                      aria-current={isActive ? "page" : undefined}
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
      {isOpen ? (
        <nav
          id={menuId}
          aria-label="Hauptnavigation mobil"
          className="fixed top-20 right-6 left-6 z-55 sm:hidden"
        >
          <ul className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-4 text-sm font-medium shadow-lg">
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
      ) : null}
    </>
  );
}
