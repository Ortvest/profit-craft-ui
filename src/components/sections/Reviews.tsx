import { getTranslations } from 'next-intl/server';
import ReviewsMarquee, {
  type ReviewMarqueeItem,
} from '@/components/ui/ReviewsMarquee';

export default async function Reviews() {
  const t = await getTranslations('reviews');

  const avatarByReview = {
    r1Title: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&h=96&q=80',
    r2Title: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&h=96&q=80',
    r3Title: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&h=96&q=80',
    r4Title: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80',
    r5Title: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=96&h=96&q=80',
    r6Title: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&h=96&q=80',
    r7Title: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80',
    r8Title: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=96&h=96&q=80',
  } as const;

  const reviewKeys = [
    { titleKey: 'r1Title', textKey: 'r1Text', authorKey: 'r1Author', img: avatarByReview.r1Title },
    { titleKey: 'r2Title', textKey: 'r2Text', authorKey: 'r2Author', img: avatarByReview.r2Title },
    { titleKey: 'r3Title', textKey: 'r3Text', authorKey: 'r3Author', img: avatarByReview.r3Title },
    { titleKey: 'r4Title', textKey: 'r4Text', authorKey: 'r4Author', img: avatarByReview.r4Title },
    { titleKey: 'r5Title', textKey: 'r5Text', authorKey: 'r5Author', img: avatarByReview.r5Title },
    { titleKey: 'r6Title', textKey: 'r6Text', authorKey: 'r6Author', img: avatarByReview.r6Title },
    { titleKey: 'r7Title', textKey: 'r7Text', authorKey: 'r7Author', img: avatarByReview.r7Title },
    { titleKey: 'r8Title', textKey: 'r8Text', authorKey: 'r8Author', img: avatarByReview.r8Title },
  ] as const;

  const items: ReviewMarqueeItem[] = reviewKeys.map((r) => ({
    id: r.titleKey,
    title: t(r.titleKey),
    text: t(r.textKey),
    author: t(r.authorKey),
    img: r.img,
  }));

  return (
    <>
      <h2 className="comments-section-title">
        {t('title')}{' '}
        <span className="comments-section-title-youwrite">{t('titleHighlight')}</span>{' '}
        {t('titleEnd')}
      </h2>
      <div className="comments-section-list">
        <ReviewsMarquee items={items} ariaLabel={t('carouselAria')} />
      </div>
    </>
  );
}
