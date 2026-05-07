'use client';

import { useActionState, startTransition, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { submitContact } from '@/app/actions/contact';
import { useRouter } from 'next/navigation';

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
  | 'phone_mobile'
  | 'street_address' | 'city' | 'state' | 'post_code'
  | 'birth_date';

type FormErrors = Partial<Record<FormField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BIRTH_RE = /^\d{2}\/\d{2}\/\d{4}$/;

type StepId = 1 | 2;

export default function ContactForm() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [state, formAction, pending] = useActionState(submitContact, null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [phoneMobile, setPhoneMobile] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<StepId>(1);
  const router = useRouter();

  const [dob, setDob] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [postCode, setPostCode] = useState('');

  const clearError = (field: FormField) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validateEmail = (v: string) =>
    !v.trim() ? t('emailRequired') : !EMAIL_RE.test(v) ? t('emailInvalid') : '';

  const validateStep1 = (fd: FormData) => {
    const errs: FormErrors = {};
    if (!String(fd.get('firstname')).trim()) errs.firstname = t('firstnameRequired');
    if (!String(fd.get('lastname')).trim()) errs.lastname = t('lastnameRequired');
    const emailErr = validateEmail(String(fd.get('email')));
    if (emailErr) errs.email = emailErr;
    if (!phoneMobile.trim()) errs.phone_mobile = t('phoneMobileRequired');
    return errs;
  };

  const validateStep2 = () => {
    const errs: FormErrors = {};
    if (!dob.trim()) errs.birth_date = t('birthDateRequired');
    else if (!BIRTH_RE.test(dob)) errs.birth_date = t('birthDateInvalid');
    if (!streetAddress.trim()) errs.street_address = t('streetAddressRequired');
    if (!city.trim()) errs.city = t('cityRequired');
    if (!stateVal) errs.state = t('stateRequired');
    if (!postCode.trim()) errs.post_code = t('postCodeRequired');
    return errs;
  };

  const submitStage = (fd: FormData) => {
    fd.set('phone_mobile', phoneMobile.replace(/-/g, ''));
    fd.set('birth_date', dob);
    fd.set('street_address', streetAddress);
    fd.set('city', city);
    fd.set('state', stateVal);
    fd.set('post_code', postCode);

    startTransition(() => formAction(fd));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!form) return;
    const fd = new FormData(form);

    const errs = validateStep1(fd);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleCreatePortal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!form) return;

    if (!agreed) return;

    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const fd = new FormData(form);
    setErrors({});
    submitStage(fd);
  };

  const errorMessageKey = state?.success === false
    ? state.error === 'network'
      ? 'errorNetwork'
      : state.error === 'server'
        ? 'errorServer'
        : 'errorValidation'
    : null;

  if (state?.success) {
    router.push(`/${locale}/thank-you`);
    return null;
  }

  return (
    <form
      id="consultation-form"
      aria-labelledby="form-title"
      className="consultation-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form-title" id="form-title">
        {step === 1 ? t('step1Title') : t('step2Title')}
      </h2>
      <div
        aria-label={step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '-6px',
          marginBottom: '18px',
          color: 'rgba(0,0,0,0.45)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}
      >
        <span>{step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}</span>
        <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }} aria-hidden="true">
          <span style={{ width: 7, height: 7, borderRadius: 999, background: step === 1 ? '#22674b' : 'rgba(0,0,0,0.18)' }} />
          <span style={{ width: 7, height: 7, borderRadius: 999, background: step === 2 ? '#22674b' : 'rgba(0,0,0,0.18)' }} />
        </span>
      </div>

      {step === 1 && (
        <>
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
        </>
      )}

      {step === 2 && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={pending}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: pending ? 'not-allowed' : 'pointer',
                color: '#22674b',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              ← {t('back')}
            </button>
          </div>

          <p style={{ margin: '0 0 16px', color: 'rgba(0,0,0,0.55)', fontSize: '14px', lineHeight: 1.5 }}>
            {t('step2Help')}
          </p>

          <div className="consultation-form-field form-field-wrap">
            <input
              className="form-input"
              type="text"
              name="birth_date"
              placeholder={t('birthDatePlaceholder')}
              maxLength={10}
              disabled={pending}
              value={dob}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                let v = digits.slice(0, 2);
                if (digits.length > 2) v += '/' + digits.slice(2, 4);
                if (digits.length > 4) v += '/' + digits.slice(4, 8);
                setDob(v);
                clearError('birth_date');
              }}
              onBlur={() => {
                if (dob && !BIRTH_RE.test(dob)) setErrors((p) => ({ ...p, birth_date: t('birthDateInvalid') }));
              }}
            />
            {errors.birth_date && <span className="form-field-error">{errors.birth_date}</span>}
          </div>

          <div className="consultation-form-field form-field-wrap">
            <input
              className="form-input"
              type="text"
              name="street_address"
              placeholder={t('streetAddressPlaceholder')}
              maxLength={255}
              disabled={pending}
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
                clearError('street_address');
              }}
            />
            {errors.street_address && <span className="form-field-error">{errors.street_address}</span>}
          </div>

          <div className="form-grid-3">
            <div className="consultation-form-field form-field-wrap">
              <input
                className="form-input"
                type="text"
                name="city"
                placeholder={t('cityPlaceholder')}
                maxLength={100}
                disabled={pending}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  clearError('city');
                }}
              />
              {errors.city && <span className="form-field-error">{errors.city}</span>}
            </div>

            <div className="consultation-form-field form-field-wrap">
              <select
                name="state"
                className="form-input form-select"
                disabled={pending}
                value={stateVal}
                onChange={(e) => {
                  setStateVal(e.target.value);
                  clearError('state');
                }}
              >
                <option value="">{t('statePlaceholder')}</option>
                {US_STATES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              {errors.state && <span className="form-field-error">{errors.state}</span>}
            </div>

            <div className="consultation-form-field form-field-wrap">
              <input
                className="form-input"
                type="text"
                name="post_code"
                placeholder={t('postCodePlaceholder')}
                maxLength={10}
                disabled={pending}
                value={postCode}
                onChange={(e) => {
                  setPostCode(e.target.value.replace(/\D/g, ''));
                  clearError('post_code');
                }}
              />
              {errors.post_code && <span className="form-field-error">{errors.post_code}</span>}
            </div>
          </div>
        </>
      )}

      <div className="consultation-form-field">
        <textarea
          name="message"
          placeholder={t('messagePlaceholder')}
          className="form-textarea"
          disabled={pending}
        />
      </div>

      {step === 2 && (
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
      )}

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

      {step === 1 ? (
        <button
          type="button"
          className="form-submit"
          aria-label={t('continue')}
          disabled={pending}
          onClick={handleContinue}
          style={{ opacity: pending ? 0.7 : 1, cursor: pending ? 'wait' : 'pointer', gap: '14px' }}
        >
          {pending ? '...' : t('continue')}
          {!pending && (
            <Image src="/img/arrow-right-wight.svg" alt="" aria-hidden width={20} height={20} />
          )}
        </button>
      ) : (
        <button
          type="button"
          className="form-submit"
          aria-label={t('createMyPortal')}
          disabled={pending || !agreed}
          onClick={handleCreatePortal}
          style={{ opacity: (pending || !agreed) ? 0.7 : 1, cursor: pending ? 'wait' : 'pointer', gap: '14px' }}
        >
          {pending ? '...' : t('createMyPortal')}
          {!pending && (
            <Image src="/img/arrow-right-wight.svg" alt="" aria-hidden width={20} height={20} />
          )}
        </button>
      )}
    </form>
  );
}
