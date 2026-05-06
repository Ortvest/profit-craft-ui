import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
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
            <a className="contact-information-item-text" href="mailto:hi@profitcraft.info">
              hi@profitcraft.info
            </a>
          </div>
          <div className="contact-information-item">
            <p className="contact-information-item-title">{t('phoneLabel')}</p>
            <a className="contact-information-item-text" href="tel:+19151242416" suppressHydrationWarning>
              +1 915 124 24 16
            </a>
          </div>
          <div className="contact-information-item">
            <p className="contact-information-item-title">{t('messengersLabel')}</p>
            <ul className="contact-messengers-list">
              <li>
                <a href="https://m.me/yourusername" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="contact-messengers-icon"
                    src="/img/more-img/Facebook_Messenger.svg"
                    alt="Facebook Messenger"
                    width={32}
                    height={32}
                  />
                </a>
              </li>
              <li>
                <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="contact-messengers-icon"
                    src="/img/more-img/WhatsApp.svg"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                  />
                </a>
              </li>
              <li>
                <a href="https://t.me/yourprofile" target="_blank" rel="noopener noreferrer">
                  <Image
                    className="contact-messengers-icon"
                    src="/img/more-img/Telegram.svg"
                    alt="Telegram"
                    width={32}
                    height={32}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="contact-information-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.123456789!2d-118.3510!3d34.1021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf3b3b3b3b3b%3A0x0!2s3412+Barham+Blvd%2C+Los+Angeles%2C+CA+90068!5e0!3m2!1suk!2spl!4v1751542303022!5m2!1suk!2spl"
            width="100%"
            height="310"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="map Profit Craft"
          />
        </div>
      </div>

      <ContactForm />
    </>
  );
}
