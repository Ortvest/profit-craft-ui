import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer() {
  const t = await getTranslations('footer');
  const locale = await getLocale();

  return (
    <>
      <Image src="/img/logotype.svg" alt={t('logoAlt')} width={145} height={48} />
      <nav className="footer-nav" aria-label="Footer navigation">
        <ul className="footer-nav-list" id="footer-list">
          <li className="footer-nav-list-item">
            <Link href="#services">{t('services')}</Link>
          </li>
          <li className="footer-nav-list-item">
            <Link href="#plans">{t('price')}</Link>
          </li>
          <li className="footer-nav-list-item">
            <Link href="#faq">{t('faq')}</Link>
          </li>
          <li className="footer-nav-list-item" id="footer-contact-us">
            <Link href="#contact">{t('contact')}</Link>
          </li>
          <li className="footer-nav-list-item">
            <Link href={`/${locale}/privacy-policy`}>{t('privacy')}</Link>
          </li>
          <li className="footer-nav-list-item">
            <Link href={`/${locale}/terms-and-conditions`}>{t('terms')}</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
