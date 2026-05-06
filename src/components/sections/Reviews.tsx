import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Reviews() {
  const t = await getTranslations('reviews');

  const reviews = [
    { titleKey: 'r1Title', textKey: 'r1Text', authorKey: 'r1Author', img: '/img/mans/man.svg' },
    { titleKey: 'r2Title', textKey: 'r2Text', authorKey: 'r2Author', img: '/img/mans/womans.svg' },
    { titleKey: 'r3Title', textKey: 'r3Text', authorKey: 'r3Author', img: '/img/mans/man.svg' },
    { titleKey: 'r4Title', textKey: 'r4Text', authorKey: 'r4Author', img: '/img/mans/womans.svg' },
    { titleKey: 'r5Title', textKey: 'r5Text', authorKey: 'r5Author', img: '/img/mans/man.svg' },
    { titleKey: 'r6Title', textKey: 'r6Text', authorKey: 'r6Author', img: '/img/mans/womans.svg' },
    { titleKey: 'r7Title', textKey: 'r7Text', authorKey: 'r7Author', img: '/img/mans/man.svg' },
    { titleKey: 'r8Title', textKey: 'r8Text', authorKey: 'r8Author', img: '/img/mans/man.svg' },
  ] as const;

  const ReviewCard = ({ item }: { item: typeof reviews[number] }) => (
    <article className="comments-item">
      <div className="comments-item-description">
        <p className="comments-title">{t(item.titleKey)}</p>
        <p className="comments-description">{t(item.textKey)}</p>
      </div>
      <div className="comments-author-mark">
        <Image src={item.img} alt={`Photo of ${t(item.authorKey)}`} width={48} height={48} />
        <div className="comments-name-raiting">
          <p className="comments-name">{t(item.authorKey)}</p>
          <Image src="/img/mans/raiting-full.svg" alt="5 star rating" width={80} height={16} />
        </div>
      </div>
    </article>
  );

  return (
    <>
      <h2 className="comments-section-title">
        {t('title')}{' '}
        <span className="comments-section-title-youwrite">{t('titleHighlight')}</span>{' '}
        {t('titleEnd')}
      </h2>
      <div className="comments-section-list">
        <div className="comments-track">
          {reviews.map((r) => <ReviewCard key={r.titleKey} item={r} />)}
        </div>
        <div className="comments-track">
          {reviews.map((r) => <ReviewCard key={`dup-${r.titleKey}`} item={r} />)}
        </div>
      </div>
    </>
  );
}
