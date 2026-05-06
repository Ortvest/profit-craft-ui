'use client';

import { useActionState, startTransition, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { submitContact } from '@/app/actions/contact';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

type FormField =
  | 'firstname' | 'lastname' | 'email'
  | 'phone_home' | 'phone_mobile'
  | 'street_address' | 'city' | 'state' | 'post_code'
  | 'birth_date';

type FormErrors = Partial<Record<FormField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [state, formAction, pending] = useActionState(submitContact, null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [phoneMobile, setPhoneMobile] = useState('');
  const [agreed, setAgreed] = useState(false);

  const clearError = (field: FormField) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validateEmail = (v: string) =>
    !v.trim() ? t('emailRequired') : !EMAIL_RE.test(v) ? t('emailInvalid') : '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set('phone_mobile', phoneMobile.replace(/-/g, ''));

    const errs: FormErrors = {};
    if (!String(fd.get('firstname')).trim()) errs.firstname = t('firstnameRequired');
    if (!String(fd.get('lastname')).trim()) errs.lastname = t('lastnameRequired');
    const emailErr = validateEmail(String(fd.get('email')));
    if (emailErr) errs.email = emailErr;
    if (!phoneMobile.trim()) errs.phone_mobile = t('phoneMobileRequired');

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    startTransition(() => formAction(fd));
  };

  const errorMessageKey = state?.success === false
    ? state.error === 'network'
      ? 'errorNetwork'
      : state.error === 'server'
        ? 'errorServer'
        : 'errorValidation'
    : null;

  if (state?.success) {
    return (
      <div
        id="consultation-form"
        className="consultation-form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          padding: '48px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(34,103,75,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M7 16.5L13 22.5L25 10"
              stroke="#22674b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111' }}>
            {t('successTitle')}
          </p>
          <p style={{ margin: 0, fontSize: '15px', color: 'rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
            {t('successMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      id="consultation-form"
      aria-labelledby="form-title"
      className="consultation-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form-title" id="form-title">{t('formTitle')}</h2>

      <div className="form-grid-2">
        <div className="consultation-form-field form-field-wrap">
          <input
            className="form-input"
            type="text"
            name="firstname"
            placeholder={t('firstnamePlaceholder')}
            maxLength={100}
            disabled={pending}
            onChange={() => clearError('firstname')}
          />
          {errors.firstname && <span className="form-field-error">{errors.firstname}</span>}
        </div>
        <div className="consultation-form-field form-field-wrap">
          <input
            className="form-input"
            type="text"
            name="lastname"
            placeholder={t('lastnamePlaceholder')}
            maxLength={100}
            disabled={pending}
            onChange={() => clearError('lastname')}
          />
          {errors.lastname && <span className="form-field-error">{errors.lastname}</span>}
        </div>
      </div>

      <div className="consultation-form-field form-field-wrap">
        <input
          className="form-input"
          type="email"
          name="email"
          placeholder={t('emailPlaceholder')}
          maxLength={254}
          disabled={pending}
          onChange={() => clearError('email')}
          onBlur={(e) => {
            const err = validateEmail(e.target.value);
            if (err) setErrors((p) => ({ ...p, email: err }));
          }}
        />
        {errors.email && <span className="form-field-error">{errors.email}</span>}
      </div>

      <div className="form-grid-1">
        <div className="consultation-form-field form-field-wrap">
          <label className="form-field-label" htmlFor="phone_mobile">{t('phoneMobileLabel')}</label>
          <input
            id="phone_mobile"
            className="form-input"
            type="text"
            name="phone_mobile"
            placeholder={t('phoneMobilePlaceholder')}
            maxLength={20}
            disabled={pending}
            value={phoneMobile}
            onChange={(e) => {
              setPhoneMobile(e.target.value.replace(/[^\d-]/g, ''));
              clearError('phone_mobile');
            }}
          />
          {errors.phone_mobile && <span className="form-field-error">{errors.phone_mobile}</span>}
        </div>
      </div>

      <div className="consultation-form-field">
        <textarea
          name="message"
          placeholder={t('messagePlaceholder')}
          className="form-textarea"
          disabled={pending}
        />
      </div>

      <div className="form-checkbox-field">
        <input
          type="checkbox"
          id="agreement"
          name="agreement"
          className="form-checkbox"
          required
          disabled={pending}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label className="form-checkbox-label" htmlFor="agreement">
          {t('agreement')}{' '}
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="form-checkbox-label_blank"
          >
            {t('agreementLink')}
          </Link>
          {t('agreementEnd') ? ` ${t('agreementEnd')}` : ''}
        </label>
      </div>

      {state && !state.success && errorMessageKey && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '14px 16px',
            background: 'rgba(229,62,62,0.06)',
            border: '1px solid rgba(229,62,62,0.2)',
            borderRadius: '10px',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(229,62,62,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '1px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="10" cy="10" r="8.5" stroke="#e53e3e" strokeWidth="1.5"/>
              <path d="M10 6v5" stroke="#e53e3e" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="14" r="0.9" fill="#e53e3e"/>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#c53030' }}>
              {t('errorTitle')}
            </p>
            <p style={{ margin: 0, fontSize: '13px', color: '#742a2a', lineHeight: 1.5, opacity: 0.85 }}>
              {t(errorMessageKey)}
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="form-submit"
        aria-label={t('send')}
        disabled={pending || !agreed}
        style={{ opacity: (pending || !agreed) ? 0.7 : 1, cursor: pending ? 'wait' : 'pointer' }}
      >
        {pending ? '...' : t('send')}
        {!pending && (
          <Image src="/img/arrow-right-wight.svg" alt="" aria-hidden width={20} height={20} />
        )}
      </button>
    </form>
  );
}
