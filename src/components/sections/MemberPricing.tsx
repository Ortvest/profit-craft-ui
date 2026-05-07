import { getTranslations } from 'next-intl/server';
import ScrollToFormButton from '@/components/ui/ScrollToFormButton';

type Tier = {
  id: string;
  name: string;
  price: string;
  fee: string;
  bestFor: string;
  includesTitle: string;
  includes: string[];
  badge?: string;
};

export default async function MemberPricing() {
  const t = await getTranslations('memberPricing');

  const tiers: Tier[] = [
    {
      id: 'membership-foundation',
      name: t('option1Title'),
      price: t('option1Price'),
      fee: t('option1Fee'),
      bestFor: t('option1BestFor'),
      includesTitle: t('includes'),
      includes: [
        t('o1i1'),
        t('o1i2'),
        t('o1i3'),
        t('o1i4'),
        t('o1i5'),
        t('o1i6'),
        t('o1i7'),
        t('o1i8'),
      ],
    },
    {
      id: 'membership-restore',
      name: t('option2Title'),
      price: t('option2Price'),
      fee: t('option2Fee'),
      bestFor: t('option2BestFor'),
      includesTitle: t('includesEverythingInFoundationPlus'),
      includes: [
        t('o2i1'),
        t('o2i2'),
        t('o2i3'),
        t('o2i4'),
        t('o2i5'),
        t('o2i6'),
        t('o2i7'),
        t('o2i8'),
      ],
      badge: t('mostPopular'),
    },
    {
      id: 'membership-premier',
      name: t('option3Title'),
      price: t('option3Price'),
      fee: t('option3Fee'),
      bestFor: t('option3BestFor'),
      includesTitle: t('includesEverythingInRestorePlus'),
      includes: [
        t('o3i1'),
        t('o3i2'),
        t('o3i3'),
        t('o3i4'),
        t('o3i5'),
        t('o3i6'),
        t('o3i7'),
        t('o3i8'),
      ],
    },
  ];

  return (
    <div className="ambitions-section-columns">
      <h2 className="ambitions-section-title member-pricing-title" id="member-pricing-title">
        {t('title')}{' '}
        <span className="ambitions-section-title-ambitions">{t('titleHighlight')}</span>
      </h2>

      <div className="ambitions-plan-help member-pricing">
        <div className="ambitions-plan-list">
          {tiers.map((tier, idx) => (
            <article key={tier.id} className="ambitions-plan-item" id={tier.id}>
              <div className="member-pricing-top">
                <div className="ambitions-plan-name-rating">
                  <p className="ambitions-plan-name">{tier.name}</p>
                  {tier.badge && (
                    <div className="ambitions-plan-rating">
                      <p className="plan-rating-text">{tier.badge}</p>
                    </div>
                  )}
                </div>

                <div className="ambition-price-time-description">
                  <div className="ambition-price-time">
                    <p className="ambitions-plan-price">{tier.price}</p>
                    <p className="ambitions-plan-time">{t('perMonth')}</p>
                  </div>
                  <p className="ambitions-plan-description member-fee-line">{tier.fee}</p>
                  <p className="ambitions-plan-description member-bestfor">
                    <span className="member-bestfor-label">{t('bestForLabel')}</span> {tier.bestFor}
                  </p>
                </div>
              </div>

              <ScrollToFormButton className="ambitions-plan-select scroll-to-form" ariaLabel={t('getStartedAria')}>
                {t('getStarted')}
              </ScrollToFormButton>

              <p className="ambitions-plan-details-title">{tier.includesTitle}</p>
              <ul className="ambitions-details-list">
                {tier.includes.map((f) => (
                  <li key={f} className="ambitions-details-item">{f}</li>
                ))}
              </ul>
              {idx === 2 && <p className="ambitions-services-discount-note">{t('cancelAnytime')}</p>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

