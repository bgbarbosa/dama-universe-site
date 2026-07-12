export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "dama-universe:privacy-consent";
export const CONSENT_DURATION_DAYS = 180;

export type ConsentPreferences = {
  version: typeof CONSENT_VERSION;
  analytics: boolean;
  externalMedia: boolean;
  updatedAt: string;
  expiresAt: string;
};

type ConsentChoices = Pick<ConsentPreferences, "analytics" | "externalMedia">;

export function createConsentPreferences(
  choices: ConsentChoices,
  now = new Date()
): ConsentPreferences {
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + CONSENT_DURATION_DAYS);

  return {
    version: CONSENT_VERSION,
    analytics: choices.analytics,
    externalMedia: choices.externalMedia,
    updatedAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}

export function parseConsentPreferences(
  value: string | null,
  now = new Date()
): ConsentPreferences | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>;
    const expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : null;
    const updatedAt = parsed.updatedAt ? new Date(parsed.updatedAt) : null;

    if (
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.externalMedia !== "boolean" ||
      typeof parsed.updatedAt !== "string" ||
      !updatedAt ||
      Number.isNaN(updatedAt.getTime()) ||
      !expiresAt ||
      Number.isNaN(expiresAt.getTime()) ||
      expiresAt <= updatedAt ||
      expiresAt <= now
    ) {
      return null;
    }

    return parsed as ConsentPreferences;
  } catch {
    return null;
  }
}
