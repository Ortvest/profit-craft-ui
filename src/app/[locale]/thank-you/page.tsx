import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('thankYou');

  return (
    <main style={{ minHeight: '70vh', display: 'grid', placeItems: 'center', padding: '56px 24px' }}>
      <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(34,103,75,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M7 16.5L13 22.5L25 10"
              stroke="#22674b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#111' }}>{t('title')}</h1>
        <p style={{ margin: '10px 0 0', fontSize: 15, color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
          {t('message')}
        </p>

        <Link
          href={`/${locale}`}
          style={{
            display: 'inline-block',
            marginTop: 22,
            fontSize: 14,
            fontWeight: 700,
            color: '#22674b',
            textDecoration: 'none',
          }}
        >
          {t('backToHome')}
        </Link>
      </div>
    </main>
  );
}

