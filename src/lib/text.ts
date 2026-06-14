const MOJIBAKE_PATTERN = /[ÃÂÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ]/;
const HANGUL_PATTERN = /[가-힣]/;
const COMMON_REPAIRS: Record<string, string> = {
  'ë©¤ë²„ì': '멤버일',
};

const WINDOWS_1252_BYTES: Record<number, number> = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f,
};

const toMojibakeBytes = (value: string) => {
  const bytes: number[] = [];

  for (const char of value) {
    const code = char.charCodeAt(0);
    const byte = code <= 0xff ? code : WINDOWS_1252_BYTES[code];

    if (byte === undefined) return null;
    bytes.push(byte);
  }

  return Uint8Array.from(bytes);
};

export const repairMojibake = (value?: string | null) => {
  if (!value || !MOJIBAKE_PATTERN.test(value)) return value ?? '';

  const commonRepair = Object.entries(COMMON_REPAIRS).find(([broken]) =>
    value.startsWith(broken)
  );

  if (commonRepair) return commonRepair[1];

  try {
    const bytes = toMojibakeBytes(value);
    if (!bytes) return value;

    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);

    return HANGUL_PATTERN.test(decoded) ? decoded : value;
  } catch {
    return value;
  }
};
