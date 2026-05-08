import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ui/ContactForm';

export default async function Contact() {
  const t = await getTranslations('contact');

  return (
    <>
      <div className="contact-information-block">
        <h2 className="contact-title">{t('title')}</h2>
        <ul className="contact-features-list">
          <li className="contact-feature-item">{t('feature1')}</li>
          <li className="contact-feature-item">{t('feature2')}</li>
          <li className="contact-feature-item">{t('feature3')}</li>
        </ul>
        <div className="contact-information-list">
          <div className="contact-information-item">
            <p className="contact-information-item-title">{t('emailLabel')}</p>
            <a className="contact-information-item-text" href="mailto:Profitcraftllc@gmail.com">
              Profitcraftllc@gmail.com
            </a>
          </div>
          <div className="contact-information-item">
            <p className="contact-information-item-title">{t('phoneLabel')}</p>
            <a className="contact-information-item-text" href="tel:+19733706666">
              (973) 370-6666
            </a>
          </div>
        </div>
      </div>

      <ContactForm />
    </>
  );
}
