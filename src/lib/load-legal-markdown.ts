import fs from 'fs';
import path from 'path';

export type LegalDocSlug = 'privacy-policy' | 'terms-and-conditions';

const FILE_MAP: Record<LegalDocSlug, string> = {
  'privacy-policy': 'privacy-policy.md',
  'terms-and-conditions': 'terms-and-conditions.md',
};

const legalDir = path.join(process.cwd(), 'content', 'legal');

export function loadLegalMarkdown(slug: LegalDocSlug): string {
  const filename = FILE_MAP[slug];
  const fullPath = path.join(legalDir, filename);
  return fs.readFileSync(fullPath, 'utf8');
}
