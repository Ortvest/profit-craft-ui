'use client';

import { useState } from 'react';
import Image from 'next/image';

type Item = { q: string; a: string };

export default function FaqInteractive({ items }: { items: Item[] }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, idx) => (
        <details
          key={idx}
          className="faq-item"
          open={openIdx === idx}
          onClick={(e) => {
            e.preventDefault();
            setOpenIdx(openIdx === idx ? -1 : idx);
          }}
        >
          <summary className="faq-item-title-img">
            <p className="faq-item-title">{item.q}</p>
            <Image
              src={openIdx === idx ? '/img/faq/minus.svg' : '/img/faq/plus.svg'}
              alt={openIdx === idx ? 'minus' : 'plus'}
              width={24}
              height={24}
            />
          </summary>
          <p className="faq-item-description">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
