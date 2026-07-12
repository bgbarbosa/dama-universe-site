import { describe, expect, it } from "vitest";

import {
  CONSENT_DURATION_DAYS,
  CONSENT_VERSION,
  createConsentPreferences,
  parseConsentPreferences,
} from "@/lib/consent";

describe("preferências de consentimento", () => {
  const now = new Date("2026-07-12T12:00:00.000Z");

  it("cria uma preferência por 180 dias", () => {
    const result = createConsentPreferences(
      { analytics: true, externalMedia: false },
      now
    );

    expect(result.version).toBe(CONSENT_VERSION);
    expect(result.analytics).toBe(true);
    expect(result.externalMedia).toBe(false);
    expect(
      (new Date(result.expiresAt).getTime() - now.getTime()) / 86_400_000
    ).toBe(CONSENT_DURATION_DAYS);
  });

  it("lê uma preferência válida", () => {
    const value = JSON.stringify(
      createConsentPreferences({ analytics: false, externalMedia: true }, now)
    );

    expect(parseConsentPreferences(value, now)?.externalMedia).toBe(true);
  });

  it.each([
    null,
    "inválido",
    JSON.stringify({}),
    JSON.stringify({
      ...createConsentPreferences({ analytics: true, externalMedia: true }, now),
      version: CONSENT_VERSION + 1,
    }),
    JSON.stringify({
      ...createConsentPreferences({ analytics: true, externalMedia: true }, now),
      updatedAt: "inválida",
    }),
  ])("rejeita preferências inválidas", (value) => {
    expect(parseConsentPreferences(value, now)).toBeNull();
  });

  it("rejeita preferência expirada", () => {
    const value = JSON.stringify(
      createConsentPreferences({ analytics: true, externalMedia: true }, now)
    );
    const afterExpiration = new Date("2027-02-01T00:00:00.000Z");

    expect(parseConsentPreferences(value, afterExpiration)).toBeNull();
  });
});
