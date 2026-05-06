'use server';

import { z } from 'zod';

const optionalStr = (max: number) =>
  z.string().max(max).nullish().transform((v) => v ?? undefined);

const contactSchema = z.object({
  firstname: z.string().min(1).max(100),
  lastname: z.string().min(1).max(100),
  email: z.string().email().max(254),
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

export type ContactResult = { success: true } | { success: false; error: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001';


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
    console.error('[contact] validation', parsed.error.flatten());
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

    const res = await fetch(`${API_URL}/crc/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });


    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[contact] backend error', res.status, text);
      return { success: false, error: 'server' };
    }

    return { success: true };
  } catch (err) {
    console.error('[contact] fetch error', err);
    return { success: false, error: 'network' };
  }
}
