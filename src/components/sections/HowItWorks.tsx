import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import HowItWorksInteractive from '@/components/ui/HowItWorksInteractive';

export default async function HowItWorks() {
  const t = await getTranslations('howItWorks');

  const steps = [
    {
      title: t('step1Title'),
      description: t('step1Desc'),
      ariaLabel: `Step 1: ${t('step1Title')}`,
      dividerClass: 'divider1',
    },
    {
      title: t('step2Title'),
      description: t('step2Desc'),
      ariaLabel: `Step 2: ${t('step2Title')}`,
      dividerClass: 'divider2',
    },
    {
      title: t('step3Title'),
      description: t('step3Desc'),
      ariaLabel: `Step 3: ${t('step3Title')}`,
      dividerClass: 'divider3',
    },
  ];

  const cardData = {
    card1Cta: t('card1Cta'),
    card1Desc: t('card1Desc'),
    card2Title: t('card2Title'),
    card2Cta: t('card2Cta'),
    card2Items: [
      t('card2Item1'),
      t('card2Item2'),
      t('card2Item3'),
      t('card2Item4'),
      t('card2Item5'),
    ],
    corrected: t('corrected'),
    card3Cta: t('card3Cta'),
    creditLimit: t('creditLimit'),
    autoLoans: t('autoLoans'),
    approved: t('approved'),
    creditScore: t('creditScore'),
  };

  const mobileSteps = [
    {
      src: '/img/profit/step1.svg',
      alt: 'Study',
      title: t('mobileStep1Title'),
      desc: t('mobileStep1Desc'),
    },
    {
      src: '/img/profit/step2.svg',
      alt: 'Fix',
      title: t('mobileStep2Title'),
      desc: t('mobileStep2Desc'),
    },
    {
      src: '/img/profit/step3.svg',
      alt: 'Pump',
      title: t('mobileStep3Title'),
      desc: t('mobileStep3Desc'),
    },
  ];

  return (
    <>
      <h2 className="profit-craft-title">
        {t('title')} <span className="profit-craft-Profit-Craft">{t('titleBrand')} </span>
        {t('titleEnd')}
      </h2>
      <HowItWorksInteractive steps={steps} cardData={cardData} />
      <div className="profit-craft-mobile">
        {mobileSteps.map((step) => (
          <div key={step.title} className="profit-craft-mobile-item">
            <Image src={step.src} alt={step.alt} width={48} height={48} />
            <div className="profit-craft-mobile-text">
              <p className="profit-mobile-title">{step.title}</p>
              <p className="profit-mobile-description">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
