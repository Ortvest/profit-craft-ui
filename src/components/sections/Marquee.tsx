import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

const banks = [
  { src: '/img/companies/JPMorganChase.svg', alt: 'JPMorganChase logo' },
  { src: '/img/companies/Citi.svg', alt: 'Citi logo' },
  { src: '/img/companies/bank-of-america.svg', alt: 'Bank of America logo' },
  { src: '/img/companies/wells-fargo.svg', alt: 'Wells Fargo logo' },
  { src: '/img/companies/U.S._Bancorp.svg', alt: 'U.S. Bancorp logo' },
  { src: '/img/companies/goldman-sachs.svg', alt: 'Goldman Sachs logo' },
  { src: '/img/companies/truist.svg', alt: 'Truist logo' },
];

export default async function Marquee() {
  const t = await getTranslations('marquee');
  const doubled = [...banks, ...banks];

  return (
    <div className="marquee" aria-label={t('ariaLabel')}>
      <ul className="companies-logo-list">
        {doubled.map((bank, idx) => (
          <li key={idx}>
            <Image src={bank.src} alt={bank.alt} width={120} height={40} />
          </li>
        ))}
      </ul>
    </div>
  );
}
