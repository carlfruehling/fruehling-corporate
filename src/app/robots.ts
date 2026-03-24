import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://fruehling-corporate.de/sitemap.xml",
    host: "https://fruehling-corporate.de",
  };
}
