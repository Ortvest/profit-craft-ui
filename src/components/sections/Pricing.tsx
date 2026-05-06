import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import ScrollToFormButton from '@/components/ui/ScrollToFormButton';
import PricingInteractive from '@/components/ui/PricingInteractive';

export default async function Pricing() {
  const t = await getTranslations('pricing');

  type Plan = {
    id: string;
    name: string;
    price: string;
    duration: string;
    description: string;
    fromLabel: string;
    features: string[];
    badge?: string;
    disclaimer?: string;
  };

  const plans: Plan[] = [
    {
      id: 'plan-basic',
      name: t('basic'),
      price: t('basicPrice'),
      duration: t('basicDuration'),
      description: t('basicDesc'),
      fromLabel: t('basicFrom'),
      features: [t('basicF1'), t('basicF2'), t('basicF3'), t('basicF4')],
    },
    {
      id: 'plan-advanced',
      name: t('advanced'),
      price: t('advancedPrice'),
      duration: t('advancedDuration'),
      description: t('advancedDesc'),
      fromLabel: t('advancedFrom'),
      features: [t('advancedF1'), t('advancedF2'), t('advancedF3'), t('advancedF4')],
      badge: t('popular'),
    },
    {
      id: 'plan-premium',
      name: t('premium'),
      price: t('premiumPrice'),
      duration: t('premiumDuration'),
      description: t('premiumDesc'),
      fromLabel: t('premiumFrom'),
      features: [t('premiumF1'), t('premiumF2'), t('premiumF3'), t('premiumF4'), t('premiumF5'), t('premiumF6')],
      badge: t('save35'),
      disclaimer: t('premiumDisclaimer'),
    },
  ];

  const services = [
    {
      name: t('inquiriesName'),
      price: t('inquiriesPrice'),
      sub: t('inquiriesPer'),
      discount: t('inquiriesDiscount'),
      desc: t('inquiriesDesc'),
    },
    { name: t('lateName'), price: t('latePrice'), discount: t('lateDiscount'), desc: t('lateDesc') },
    { name: t('chargeOffName'), price: t('chargeOffPrice'), desc: t('chargeOffDesc') },
    { name: t('collectionsName'), price: t('collectionsPrice'), desc: t('collectionsDesc') },
    { name: t('repoName'), price: t('repoPrice'), desc: t('repoDesc') },
  ];

  return (
    <div className="ambitions-section-columns">
      <h2 className="ambitions-section-title" id="plans-title">
        {t('title')}{' '}
        <span className="ambitions-section-title-ambitions">{t('titleHighlight')}</span>
      </h2>

      <PricingInteractive
        basicLabel={t('basic')}
        advancedLabel={t('advanced')}
        premiumLabel={t('premium')}
        starAlt="star ico"
      />

      <div className="ambitions-plan-help">
        <div className="ambitions-plan-list">
          {plans.map((plan) => (
            <article key={plan.id} className="ambitions-plan-item" id={plan.id}>
              <div className="ambitions-plan-name-rating">
                <p className="ambitions-plan-name">{plan.name}</p>
                {plan.badge && (
                  <div className="ambitions-plan-rating">
                    <p className="plan-rating-text">{plan.badge}</p>
                  </div>
                )}
              </div>
              <div className="ambition-price-time-description">
                <div className="ambition-price-time">
                  <p className="ambitions-plan-price">{plan.price}</p>
                  <p className="ambitions-plan-time">{plan.duration}</p>
                </div>
                <p className="ambitions-plan-description">{plan.description}</p>
              </div>
              <ScrollToFormButton className="ambitions-plan-select scroll-to-form" ariaLabel={`Select ${plan.name} plan`}>
                {t('selectPlan')}
              </ScrollToFormButton>
              <p className="ambitions-plan-details-title">{plan.fromLabel}</p>
              <ul className="ambitions-details-list">
                {plan.features.map((f) => (
                  <li key={f} className="ambitions-details-item">{f}</li>
                ))}
              </ul>
              {plan.disclaimer && (
                <p className="ambitions-services-discount-note">{plan.disclaimer}</p>
              )}
            </article>
          ))}
        </div>

        <div className="ambitions-help">
          <div className="ambitions-help-ico-text">
            <Image src="/img/bank-note-05.svg" alt="bank note icon" width={32} height={32} />
            <p className="ambitions-help-text">{t('installmentNote')}</p>
          </div>
          <ScrollToFormButton className="ambitions-help-button scroll-to-form">
            {t('contactUs')}
          </ScrollToFormButton>
        </div>
      </div>

      <article id="services" className="ambitions-services">
        <h3 className="ambitions-services-title">{t('servicesTitle')}</h3>
        <div className="ambitions-services-list">
          {services.map((s) => (
            <div key={s.name} className="ambitions-services-item">
              <p className="ambitions-services-name">{s.name}</p>
              <div className="ambitions-services-price-description">
                <div className="ambitions-services-price-inquiries">
                  <p className="ambitions-services-price">{s.price}</p>
                  {'sub' in s && s.sub && <p className="ambitions-services-inquiries">{s.sub}</p>}
                </div>
                {'discount' in s && s.discount && (
                  <p className="ambitions-services-discount-note">{s.discount}</p>
                )}
                <p className="ambitions-services-description">{s.desc}</p>
              </div>
            </div>
          ))}
          <div className="ambitions-services-item-contact">
            <p className="ambitions-services-name-contact">{t('customNote')}</p>
            <ScrollToFormButton className="ambitions-services-contact-button scroll-to-form">
              <p className="ambitions-services-contact-button-text">{t('contactUs')}</p>
              <Image src="/img/arrow-right-wight.svg" alt="arrow right" width={20} height={20} />
            </ScrollToFormButton>
          </div>
        </div>
      </article>

      <div className="ambitions-payments-methods">
        {[
          { src: '/img/pay/apple-pay.svg', alt: 'Apple Pay' },
          { src: '/img/pay/google-pay.svg', alt: 'Google Pay' },
          { src: '/img/pay/paypal.svg', alt: 'PayPal' },
          { src: '/img/pay/mastercard-alt.svg', alt: 'Mastercard' },
          { src: '/img/pay/visa.svg', alt: 'Visa' },
        ].map((p) => (
          <Image key={p.alt} src={p.src} alt={p.alt} width={60} height={32} />
        ))}
      </div>

      <PricingRollUp rollUpText={t('rollUp')} showText={t('showServices')} />
    </div>
  );
}

function PricingRollUp({ rollUpText, showText }: { rollUpText: string; showText: string }) {
  return <PricingRollUpClient rollUpText={rollUpText} showText={showText} />;
}

import PricingRollUpClient from '@/components/ui/PricingRollUpClient';
