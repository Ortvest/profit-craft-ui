import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import type { LegalDocSlug } from '@/lib/load-legal-markdown';
import { loadLegalMarkdown } from '@/lib/load-legal-markdown';

type Props = {
  locale: string;
  slug: LegalDocSlug;
};

export default async function LegalDocumentPage({ locale, slug }: Props) {
  const content = loadLegalMarkdown(slug);
  const t = await getTranslations('legal');

  return (
    <>
      <header className="header-wrapper">
        <Header />
      </header>
      <main>
        <div className="legal-page-main">
          <div className="legal-page-container">
            <Link className="legal-back-link" href={`/${locale}`}>
              {t('backToHome')}
            </Link>
            <article className="legal-doc prose-markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <footer className="footer-wrapper">
          <Footer />
        </footer>
      </main>
    </>
  );
}
