'use client';

import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  style?: CSSProperties;
};

export default function ScrollToFormButton({ children, className, ariaLabel, style }: Props) {
  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    const form = document.getElementById('consultation-form');
    if (!form) return;
    if (contactSection && window.getComputedStyle(contactSection).display === 'none') {
      contactSection.style.display = 'flex';
    }
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      type="button"
      style={style}
    >
      {children}
    </button>
  );
}
