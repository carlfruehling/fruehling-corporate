import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fruehling-corporate.de"),
  applicationName: "Fruehling Corporate",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
  },
  title: {
    default: "Fruehling Corporate",
    template: "%s | Fruehling Corporate",
  },
  description:
    "Due Diligence und Unternehmensanalyse für mittelständische Unternehmen.",
  keywords: [
    "Due Diligence",
    "Unternehmensanalyse",
    "Mittelstand",
    "KMU",
    "Unternehmensübernahme",
    "Transaktionsberatung",
  ],
  authors: [{ name: "Fruehling Corporate GmbH" }],
  creator: "Fruehling Corporate GmbH",
  publisher: "Fruehling Corporate GmbH",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://fruehling-corporate.de",
    siteName: "Fruehling Corporate",
    title: "Fruehling Corporate",
    description:
      "Due Diligence und Unternehmensanalyse für mittelständische Unternehmen.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fruehling Corporate",
    description:
      "Due Diligence und Unternehmensanalyse für mittelständische Unternehmen.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de-DE"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col px-6 lg:px-8">
          <SiteHeader />
          <main className="flex-1 py-12 sm:py-16">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
