"use client";

import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { analyticsConfig } from "@/lib/analytics";
import {
  CONSENT_STORAGE_KEY,
  createConsentPreferences,
  parseConsentPreferences,
  type ConsentPreferences,
} from "@/lib/consent";

type ConsentContextValue = {
  preferences: ConsentPreferences | null;
  ready: boolean;
  savePreferences: (
    choices: Pick<ConsentPreferences, "analytics" | "externalMedia">
  ) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const context = useContext(ConsentContext);

  if (!context) {
    throw new Error("useConsent deve ser usado dentro de ConsentProvider.");
  }

  return context;
}

function AnalyticsIntegrations() {
  const pathname = usePathname();
  const { googleAnalyticsId, microsoftClarityId } = analyticsConfig;
  const [googleAnalyticsReady, setGoogleAnalyticsReady] = useState(false);

  useEffect(() => {
    if (!googleAnalyticsId || !googleAnalyticsReady) {
      return;
    }

    window.gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_path: pathname,
      page_title: document.title,
    });
  }, [googleAnalyticsId, googleAnalyticsReady, pathname]);

  return (
    <>
      <Analytics />

      {googleAnalyticsId ? (
        <>
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'granted'
              });
              gtag('config', '${googleAnalyticsId}', { send_page_view: false });
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
            onReady={() => setGoogleAnalyticsReady(true)}
          />
        </>
      ) : null}

      {microsoftClarityId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              c[a]('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityId}");
          `}
        </Script>
      ) : null}
    </>
  );
}

function ConsentPanel({
  initialPreferences,
  onSave,
  onClose,
}: {
  initialPreferences: ConsentPreferences | null;
  onSave: ConsentContextValue["savePreferences"];
  onClose?: () => void;
}) {
  const [showDetails, setShowDetails] = useState(Boolean(initialPreferences));
  const [analytics, setAnalytics] = useState(
    initialPreferences?.analytics ?? false
  );
  const [externalMedia, setExternalMedia] = useState(
    initialPreferences?.externalMedia ?? false
  );

  return (
    <section
      aria-label="Preferências de privacidade"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-3xl border border-electric/55 bg-backgroundSoft/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:bottom-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-electricLight">Privacidade</p>
          <h2 className="mt-2 text-xl font-black text-text sm:text-2xl">
            Controle de análises e conteúdo externo
          </h2>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-borderSoft text-xl text-muted transition hover:border-electric hover:text-text focus-ring"
            aria-label="Fechar preferências de privacidade"
          >
            ×
          </button>
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-7 text-muted">
        Usamos Vercel Analytics, Google Analytics e Microsoft Clarity para
        compreender o uso do site. Vídeos do YouTube e comentários Giscus só
        abrem conexão quando você permite conteúdo externo. A escolha fica salva
        neste navegador por 180 dias. Consulte a{" "}
        <Link href="/politica-de-cookies" className="text-electricLight underline">
          Política de Cookies
        </Link>
        {" e a "}
        <Link
          href="/politica-de-privacidade"
          className="text-electricLight underline"
        >
          Política de Privacidade
        </Link>
        .
      </p>

      {showDetails ? (
        <div className="mt-5 grid gap-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/60 p-4">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              className="mt-1 h-5 w-5 accent-[#1E8CFF]"
            />
            <span>
              <span className="block font-bold text-text">Análises opcionais</span>
              <span className="mt-1 block text-sm leading-6 text-muted">
                Vercel Analytics, Google Analytics e Microsoft Clarity.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-background/60 p-4">
            <input
              type="checkbox"
              checked={externalMedia}
              onChange={(event) => setExternalMedia(event.target.checked)}
              className="mt-1 h-5 w-5 accent-[#1E8CFF]"
            />
            <span>
              <span className="block font-bold text-text">Conteúdo externo</span>
              <span className="mt-1 block text-sm leading-6 text-muted">
                Permite carregar vídeos pelo modo de privacidade aprimorada do
                YouTube e comentários via Giscus/GitHub Discussions.
              </span>
            </span>
          </label>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => onSave({ analytics: true, externalMedia: true })}
          className="min-h-11 rounded-full border border-electric bg-electric px-5 py-3 text-sm font-bold text-white transition hover:bg-electricLight focus-ring"
        >
          Aceitar opcionais
        </button>
        <button
          type="button"
          onClick={() => onSave({ analytics: false, externalMedia: false })}
          className="min-h-11 rounded-full border border-borderSoft px-5 py-3 text-sm font-bold text-text transition hover:border-electric focus-ring"
        >
          Recusar opcionais
        </button>
        {showDetails ? (
          <button
            type="button"
            onClick={() => onSave({ analytics, externalMedia })}
            className="min-h-11 rounded-full border border-gold/60 px-5 py-3 text-sm font-bold text-goldSoft transition hover:border-goldSoft focus-ring"
          >
            Salvar preferências
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            className="min-h-11 rounded-full px-5 py-3 text-sm font-bold text-muted transition hover:text-text focus-ring"
          >
            Personalizar
          </button>
        )}
      </div>
    </section>
  );
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    let stored: ConsentPreferences | null = null;

    try {
      stored = parseConsentPreferences(
        window.localStorage.getItem(CONSENT_STORAGE_KEY)
      );

      if (!stored) {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      }
    } catch {
      stored = null;
    }

    setPreferences(stored);
    setReady(true);
  }, []);

  const savePreferences = useCallback<ConsentContextValue["savePreferences"]>(
    (choices) => {
      const nextPreferences = createConsentPreferences(choices);
      const analyticsWasRevoked =
        preferences?.analytics === true && !nextPreferences.analytics;
      let persisted = false;

      try {
        window.localStorage.setItem(
          CONSENT_STORAGE_KEY,
          JSON.stringify(nextPreferences)
        );
        persisted = true;
      } catch {
        // A preferência ainda vale nesta sessão quando o armazenamento é bloqueado.
      }

      if (analyticsWasRevoked) {
        window.gtag?.("consent", "update", {
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          analytics_storage: "denied",
        });
        window.clarity?.("consent", false);
      }

      setPreferences(nextPreferences);
      setSettingsOpen(false);

      // O recarregamento remove também o coletor já injetado pela Vercel.
      if (analyticsWasRevoked && persisted) {
        window.setTimeout(() => window.location.reload(), 250);
      }
    },
    [preferences]
  );

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        ready,
        savePreferences,
        openSettings: () => setSettingsOpen(true),
      }}
    >
      {children}

      {ready && !preferences ? (
        <ConsentPanel initialPreferences={null} onSave={savePreferences} />
      ) : null}

      {ready && preferences && settingsOpen ? (
        <ConsentPanel
          initialPreferences={preferences}
          onSave={savePreferences}
          onClose={() => setSettingsOpen(false)}
        />
      ) : null}

      {ready && preferences && !settingsOpen ? (
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="fixed bottom-4 left-4 z-[90] min-h-11 rounded-full border border-borderSoft bg-backgroundSoft/92 px-4 py-2 text-xs font-bold text-muted shadow-lg backdrop-blur transition hover:border-electric hover:text-text focus-ring"
        >
          Privacidade
        </button>
      ) : null}

      {preferences?.analytics ? <AnalyticsIntegrations /> : null}
    </ConsentContext.Provider>
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
