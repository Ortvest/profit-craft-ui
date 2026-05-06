'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Props = {
  toggleLabel: string;
  messengerLabel: string;
  whatsappLabel: string;
  telegramLabel: string;
};

export default function MessengerWidgetClient({ toggleLabel, messengerLabel, whatsappLabel, telegramLabel }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="messenger-widget" ref={ref}>
      {!open && (
        <button
          className="messenger-toggle"
          aria-label={toggleLabel}
          onClick={() => setOpen(true)}
        >
          <Image src="/img/message-circle.svg" alt="" aria-hidden width={32} height={32} />
        </button>
      )}
      {open && (
        <ul className="messenger-menu" style={{ display: 'flex' }}>
          <li>
            <a href="https://m.me/Messenger" target="_blank" rel="noopener noreferrer">
              <Image src="/img/more-img/Facebook_Messenger.svg" alt="Facebook Messenger" width={24} height={24} />
              {messengerLabel}
            </a>
          </li>
          <li>
            <a href="https://wa.me/WhatsApp" target="_blank" rel="noopener noreferrer">
              <Image src="/img/more-img/WhatsApp.svg" alt="WhatsApp" width={24} height={24} />
              {whatsappLabel}
            </a>
          </li>
          <li>
            <a href="https://t.me/telegram" target="_blank" rel="noopener noreferrer">
              <Image src="/img/more-img/Telegram.svg" alt="Telegram" width={24} height={24} />
              {telegramLabel}
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
