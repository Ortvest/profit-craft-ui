'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  rollUpText: string;
  showText: string;
};

export default function PricingRollUpClient({ rollUpText, showText }: Props) {
  const [expanded, setExpanded] = useState(true);

  const handleToggle = () => {
    const services = document.getElementById('services');
    if (!services) return;

    if (expanded) {
      services.style.height = services.scrollHeight + 'px';
      requestAnimationFrame(() => {
        services.classList.add('hidden');
        services.style.height = '0px';
      });
    } else {
      services.classList.remove('hidden');
      services.style.height = services.scrollHeight + 'px';
      const onEnd = () => {
        services.style.height = 'auto';
        services.removeEventListener('transitionend', onEnd);
      };
      services.addEventListener('transitionend', onEnd);
    }

    setExpanded((v) => !v);
  };

  return (
    <div className="ambitions-roll-up" onClick={handleToggle} role="button" tabIndex={0}>
      <p className="ambitions-roll-up-text">{expanded ? rollUpText : showText}</p>
      <Image src="/img/chevron-up.svg" alt="arrow up" width={20} height={20} />
    </div>
  );
}
