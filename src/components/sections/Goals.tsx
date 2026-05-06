import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import ScrollToFormButton from '@/components/ui/ScrollToFormButton';

export default async function Goals() {
  const t = await getTranslations('goals');

  return (
    <>
      <h2 className="goals-section-title">
        {t('title')}{' '}
        <span className="goals-new-line">
          All Your <span className="goals-title-Goals">{t('titleGoals')}</span>
        </span>
      </h2>
      <ul className="goals-list">
        <li className="goals-item">
          <Image src="/img/image-pc/cards-pc.svg" alt="Credit cards icon" width={56} height={56} />
          <p className="goals-item-names">{t('creditCards')}</p>
        </li>
        <li className="goals-item">
          <Image src="/img/image-pc/auto-pc.svg" alt="" aria-hidden width={56} height={56} />
          <p className="goals-item-names">{t('autoLoans')}</p>
        </li>
        <li className="goals-item">
          <Image src="/img/image-pc/ic_creditcragt-pc.svg" alt="" aria-hidden width={56} height={56} />
          <p className="goals-item-names">{t('creditCraft')}</p>
        </li>
        <li className="goals-item">
          <Image src="/img/image-pc/help-pc.svg" alt="" aria-hidden width={56} height={56} />
          <p className="goals-item-names">{t('creditHelp')}</p>
        </li>
        <li className="goals-item">
          <Image src="/img/image-pc/accountant-pc.svg" alt="" aria-hidden width={56} height={56} />
          <p className="goals-item-names">{t('accountant')}</p>
        </li>
        <li className="goals-item goals-item-get-started" role="none">
          <ScrollToFormButton className="scroll-to-form" style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Image src="/img/image-pc/pc_getstarted.svg" alt="" aria-hidden width={56} height={56} />
            <p className="goals-item-names">{t('getStarted')}</p>
          </ScrollToFormButton>
        </li>
      </ul>
    </>
  );
}
