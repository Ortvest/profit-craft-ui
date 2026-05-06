import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function PromoBanner() {
  const t = await getTranslations('promo');

  return (
    <>
      <p className="promo-banner-text">
        {t('text')} <span className="promo-banner-text-free">{t('free')}</span>
      </p>
      <Image
        src="/img/arrow-right-green.svg"
        width={24}
        height={24}
        aria-hidden
        role="presentation"
        alt=""
      />
    </>
  );
}
