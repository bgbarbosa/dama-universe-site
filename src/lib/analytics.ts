const DEFAULT_GOOGLE_ANALYTICS_ID = "G-TJRDW9KBYX";
const DEFAULT_MICROSOFT_CLARITY_ID = "xk22l19n2j";

function readPublicIdentifier(
  value: string | undefined,
  fallback: string,
  pattern: RegExp
) {
  const identifier = value?.trim() || fallback;
  return pattern.test(identifier) ? identifier : null;
}

export const analyticsConfig = {
  googleAnalyticsId: readPublicIdentifier(
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    DEFAULT_GOOGLE_ANALYTICS_ID,
    /^G-[A-Z0-9]+$/
  ),
  microsoftClarityId: readPublicIdentifier(
    process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID,
    DEFAULT_MICROSOFT_CLARITY_ID,
    /^[a-z0-9]+$/
  ),
};
