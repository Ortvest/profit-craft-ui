import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import ScrollToFormButton from '@/components/ui/ScrollToFormButton';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <>
      <div className="main-section-title-img">
        <div className="main-text-container">
          <div className="main-title-description">
            <h1 className="main-title">
              {t('title')}{' '}
              <span className="main-title-strong">{t('titleStrong')}</span>{' '}
              {t('titleEnd')}
            </h1>
            <p className="main-text-description">{t('description')}</p>
          </div>
          <div className="main-buttons">
            <ScrollToFormButton className="button-expertise scroll-to-form" ariaLabel={t('ctaExpertise')}>
              <span>{t('ctaExpertise')}</span>
              <Image
                className="button-expertise-arrow"
                src="/img/arrow-right.svg"
                aria-hidden
                role="presentation"
                width={22}
                height={22}
                alt=""
              />
            </ScrollToFormButton>
            <ScrollToFormButton className="button-started scroll-to-form">
              <span>{t('ctaStarted')}</span>
              <Image
                className="button-expertise-arrow"
                src="/img/arrow-right.svg"
                aria-hidden
                role="presentation"
                width={22}
                height={22}
                alt=""
              />
            </ScrollToFormButton>
          </div>
        </div>
        <Image
          className="main-section-img"
          src="/img/banks/main-section-img.webp"
          alt={t('heroImgAlt')}
          width={646}
          height={411}
          priority
        />
      </div>
      <div className="main-section-achievements">
        <ul className="main-achievements-list">
          <li className="main-achievements-item">
            <span className="achievements-item-first-word">{t('stat1Highlight')}</span>
            {t('stat1').replace(t('stat1Highlight'), '')}
          </li>
          <li className="main-achievements-item">
            <span className="achievements-item-first-word">{t('stat2Highlight')}</span>
            {t('stat2')}
          </li>
          <li className="main-achievements-item">
            <span className="achievements-item-first-word">{t('stat3Highlight')}</span>
            {t('stat3')}
          </li>
          <li className="main-achievements-item">
            <div className="achievements-item-raiting">
              <span className="achievements-item-first-word">{t('stat4Highlight')}</span>
              <Image
                src="/img/mans/raiting.svg"
                alt={t('ratingAlt')}
                width={80}
                height={16}
              />
            </div>
            {t('stat4')}
          </li>
        </ul>
      </div>
    </>
  );
}
