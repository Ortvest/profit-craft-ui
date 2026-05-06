import { getTranslations } from 'next-intl/server';
import FaqInteractive from '@/components/ui/FaqInteractive';

export default async function Faq() {
  const t = await getTranslations('faq');

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ];

  return (
    <>
      <h2 className="faq-title">{t('title')}</h2>
      <FaqInteractive items={items} />
    </>
  );
}
