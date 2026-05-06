import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profitcraft.info';
const locales = ['en', 'ru', 'uk'] as const;

const staticPaths = ['', 'privacy-policy', 'terms-and-conditions'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    const suffix = path ? `/${path}` : '';
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${suffix}`,
        lastModified: new Date(),
        changeFrequency: path ? 'monthly' : 'weekly',
        priority: path ? 0.6 : 1.0,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${suffix}`]),
          ),
        },
      });
    }
  }

  return entries;
}
