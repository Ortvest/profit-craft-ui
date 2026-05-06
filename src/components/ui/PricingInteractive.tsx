'use client';

import Image from 'next/image';

type Props = {
  basicLabel: string;
  advancedLabel: string;
  premiumLabel: string;
  starAlt: string;
};

export default function PricingInteractive({ basicLabel, advancedLabel, premiumLabel, starAlt }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="ambition-section-category">
      <a
        href="#plan-basic"
        className="ambitions-section-category-text"
        data-target="plan-basic"
        onClick={(e) => handleClick(e, 'plan-basic')}
      >
        {basicLabel}
      </a>
      <a
        href="#plan-advanced"
        className="ambitions-section-category-text"
        data-target="plan-advanced"
        onClick={(e) => handleClick(e, 'plan-advanced')}
      >
        {advancedLabel}
      </a>
      <a
        href="#plan-premium"
        className="ambition-premium-star"
        data-target="plan-premium"
        onClick={(e) => handleClick(e, 'plan-premium')}
      >
        <Image src="/img/star.svg" alt={starAlt} width={16} height={16} />
        <p className="ambition-premium-text">{premiumLabel}</p>
      </a>
    </div>
  );
}
