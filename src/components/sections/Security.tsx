import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const icons = [
  { src: '/img/security-image/treat.svg', altKey: 'item1' as const },
  { src: '/img/security-image/protect.svg', altKey: 'item2' as const },
  { src: '/img/security-image/not-sell.svg', altKey: 'item3' as const },
];

export default async function Security() {
  const t = await getTranslations('security');

  return (
    <div className="security-title-list">
      <h2 id="security-title" className="security-title">{t('title')}</h2>
      <div className="security-list">
        {icons.map((icon) => (
          <div key={icon.src} className="security-item">
            <div className="security-item-icon-group">
              <Image
                className="security-item-icon"
                src={icon.src}
                alt={`Icon representing ${t(icon.altKey)}`}
                width={64}
                height={64}
                loading="lazy"
              />
            </div>
            <p className="security-item-text">{t(icon.altKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
