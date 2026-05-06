import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profitcraft.info';

const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  ru: 'ru_RU',
  uk: 'uk_UA',
};

const alternateLocales = (current: string) =>
  (['en', 'ru', 'uk'] as const).filter((l) => l !== current);

export async function generatePageMetadata(
  locale: string,
  _page = 'home'
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const canonicalUrl = `${siteUrl}/${locale}`;

  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en`,
  };
  (['en', 'ru', 'uk'] as const).forEach((l) => {
    languages[l] = `${siteUrl}/${l}`;
  });

  return {
    metadataBase: new URL(siteUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'ProfitCraft' }],
    creator: 'ProfitCraft',
    publisher: 'ProfitCraft',
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      siteName: 'ProfitCraft',
      title: t('title'),
      description: t('description'),
      locale: ogLocaleMap[locale] ?? 'en_US',
      alternateLocale: alternateLocales(locale).map((l) => ogLocaleMap[l]),
      images: [
        {
          url: `${siteUrl}/img/banks/main-section-img.webp`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `${siteUrl}/img/banks/main-section-img.webp`,
          alt: t('twitterImageAlt'),
        },
      ],
    },
  };
}

export async function generateLegalPageMetadata(
  locale: string,
  page: 'privacy' | 'terms',
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal' });
  const path = page === 'privacy' ? 'privacy-policy' : 'terms-and-conditions';
  const canonicalUrl = `${siteUrl}/${locale}/${path}`;

  const title =
    page === 'privacy' ? t('privacyTitle') : t('termsTitle');
  const description =
    page === 'privacy' ? t('privacyMetaDescription') : t('termsMetaDescription');

  const languages: Record<string, string> = {
    'x-default': `${siteUrl}/en/${path}`,
  };
  (['en', 'ru', 'uk'] as const).forEach((l) => {
    languages[l] = `${siteUrl}/${l}/${path}`;
  });

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    authors: [{ name: 'ProfitCraft' }],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      siteName: 'ProfitCraft',
      title,
      description,
      locale: ogLocaleMap[locale] ?? 'en_US',
      alternateLocale: alternateLocales(locale).map((l) => ogLocaleMap[l]),
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
