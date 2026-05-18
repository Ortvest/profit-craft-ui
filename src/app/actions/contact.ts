'use server';

import { z } from 'zod';

const optionalStr = (max: number) =>
  z.string().max(max).nullish().transform((v) => v ?? undefined);

const requiredStr = (max: number) =>
  z.preprocess((v) => (v ?? ''), z.string().min(1).max(max));

const contactSchema = z.object({
  firstname: requiredStr(100),
  lastname: requiredStr(100),
  email: z.preprocess((v) => (v ?? ''), z.string().email().max(254)),
  phone_home: optionalStr(20),
  phone_mobile: optionalStr(20),
  street_address: optionalStr(255),
  city: optionalStr(100),
  state: optionalStr(2),
  post_code: optionalStr(10),
  birth_date: optionalStr(10),
  message: optionalStr(10000),
  agreement: z.literal('on'),
});

const leadSchema = z.object({
  firstname: requiredStr(100),
  lastname: requiredStr(100),
  email: z.preprocess((v) => (v ?? ''), z.string().email().max(254)),
  phone_mobile: requiredStr(20),
  message: optionalStr(10000),
});

export type ContactResult =
  | { success: true }
  | { success: false; error: 'validation' };

export type LeadResult =
  | { success: true }
  | { success: false; error: 'network' | 'server' | 'validation' };

const API_URL = process.env.API_URL ?? 'http://localhost:4001';

export async function saveContactLead(formData: FormData): Promise<LeadResult> {
  const raw = Object.fromEntries(
    ['firstname', 'lastname', 'email', 'phone_mobile', 'message'].map((k) => [k, formData.get(k)]),
  );

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: 'validation' };
  }

  const { firstname, lastname, email, phone_mobile, message } = parsed.data;
  const body: Record<string, string> = {
    firstname,
    lastname,
    email,
    phoneMobile: phone_mobile,
  };

  if (message) body.message = message;

  try {
    const res = await fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!res.ok) {
      return { success: false, error: 'server' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'network' };
  }
}

export async function submitContact(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  const raw = Object.fromEntries(
    [
      'firstname', 'lastname', 'email',
      'phone_home', 'phone_mobile',
      'street_address', 'city', 'state', 'post_code',
      'birth_date', 'message', 'agreement',
    ].map((k) => [k, formData.get(k)]),
  );

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: 'validation' };
  }

  const {
    firstname, lastname, email,
    phone_home, phone_mobile,
    street_address, city, state, post_code,
    birth_date, message,
  } = parsed.data;

  const body: Record<string, string> = {
    type: 'Lead',
    firstname,
    lastname,
    email,
  };

  if (phone_home) body.phone_home = phone_home;
  if (phone_mobile) body.phone_mobile = phone_mobile;

  if (street_address) body.street_address = street_address;
  if (city) body.city = city;
  if (state) body.state = state;
  if (post_code) body.post_code = post_code;
  if (birth_date) body.birth_date = birth_date;
  if (message) body.memo = message;

  try {
    await fetch(`${API_URL}/crc/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
  } catch {
  }

  return { success: true };
}
