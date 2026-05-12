import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';
import BurgerMenu from '@/components/ui/BurgerMenu';

const AUTO_BROKERAGE_URL = 'https://profitcraft-auto-ui.vercel.app/';

export default async function Header() {
  const t = await getTranslations('nav');

  return (
    <>
      <div className="header-brand-group">
        <Link href="/" aria-label="Profit Craft home">
          <Image
            src="/img/logotype.svg"
            alt="Profit Craft Logo"
            width={145}
            height={48}
            priority
          />
        </Link>
        <a
          className="header-product-link"
          href={AUTO_BROKERAGE_URL}
        >
          {t('autoBrokerage')}
        </a>
      </div>
      <nav className="nav" id="nav" aria-label="Main navigation">
        <ul className="nav-list" id="header-list">
          <li className="nav-list-item">
            <Link href="#plans">{t('plans')}</Link>
          </li>
          <li className="nav-list-item">
            <Link href="#services">{t('services')}</Link>
          </li>
          <li className="nav-list-item" id="contact-nav-item">
            <Link href="#contact">{t('contact')}</Link>
          </li>
          <li className="nav-list-item">
            <Link href="#faq">{t('faq')}</Link>
          </li>
          <li className="nav-list-item">
            <LocaleSwitcher />
          </li>
        </ul>
        <BurgerMenu />
      </nav>
    </>
  );
}
