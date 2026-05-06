import { getTranslations } from 'next-intl/server';
import MessengerWidgetClient from '@/components/ui/MessengerWidgetClient';

export default async function MessengerWidget() {
  const t = await getTranslations('messenger');

  return (
    <MessengerWidgetClient
      toggleLabel={t('toggleLabel')}
      messengerLabel={t('messenger')}
      whatsappLabel={t('whatsapp')}
      telegramLabel={t('telegram')}
    />
  );
}
