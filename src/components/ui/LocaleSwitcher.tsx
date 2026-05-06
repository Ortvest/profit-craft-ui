'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const locales = ['en', 'ru', 'uk'] as const;

const localeShort: Record<string, string> = {
  en: 'EN',
  ru: 'RU',
  uk: 'UK',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('locale');
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '7px 13px',
          background: open ? '#f0f7f4' : 'transparent',
          border: '1.5px solid',
          borderColor: open ? '#22674b' : 'rgba(0,0,0,0.14)',
          borderRadius: '100px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          color: open ? '#22674b' : '#333',
          letterSpacing: '0.03em',
          transition: 'all 0.18s ease',
          userSelect: 'none',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 1.5C10 1.5 7 5.5 7 10C7 14.5 10 18.5 10 18.5M10 1.5C10 1.5 13 5.5 13 10C13 14.5 10 18.5 10 18.5M1.5 10H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {localeShort[locale]}
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            margin: 0,
            padding: '6px',
            background: '#fff',
            borderRadius: '14px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)',
            listStyle: 'none',
            minWidth: '160px',
            zIndex: 1000,
          }}
        >
          {locales.map((l) => {
            const isActive = l === locale;
            return (
              <li key={l} role="option" aria-selected={isActive}>
                <button
                  onClick={() => switchLocale(l)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    padding: '9px 12px',
                    background: isActive ? '#f0f7f4' : 'transparent',
                    border: 'none',
                    borderRadius: '9px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#22674b' : '#333',
                    transition: 'background 0.15s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '26px',
                        height: '18px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isActive ? '#22674b' : '#e8e8e8',
                        color: isActive ? '#fff' : '#666',
                        flexShrink: 0,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {localeShort[l]}
                    </span>
                    {t(l)}
                  </span>
                  {isActive && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 5" stroke="#22674b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
