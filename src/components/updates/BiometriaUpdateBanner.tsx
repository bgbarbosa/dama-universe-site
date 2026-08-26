import { GlowButton } from "@/components/ui";
import { getProgramDownloadUrl } from "@/data";

type BiometriaUpdateBannerProps = {
  variant: "home" | "program";
};

const programUrl = "/programas/dama-biometria-sigo-fix";
const downloadUrl = getProgramDownloadUrl("dama-biometria-sigo-fix");

export function BiometriaUpdateBanner({
  variant,
}: BiometriaUpdateBannerProps) {
  const isProgramPage = variant === "program";

  return (
    <div
      id={isProgramPage ? "atualizacao-biometria-2-programa" : undefined}
      className="release-glow scroll-mt-24 rounded-3xl bg-surface/95 p-6 sm:p-8 lg:p-10"
      data-testid={`biometria-update-banner-${variant}`}
    >
      <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="max-w-4xl">
          <span className="release-glow-badge inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
            {isProgramPage
              ? "ATUALIZAÇÃO 2.0.0 DISPONÍVEL"
              : "ATUALIZAÇÃO IMPORTANTE"}
          </span>

          <h2 className="mt-5 text-2xl font-black leading-tight text-text sm:text-3xl lg:text-4xl">
            {isProgramPage
              ? "Compatibilidade homologada com o SIGO Desktop 1.0.48"
              : "Dama Biometria SIGO Fix 2.0.0 disponível"}
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-chromeLight sm:text-base sm:leading-8">
            {isProgramPage
              ? "A versão 2.0.0 aprimora a correção do ambiente Java/Nitgen utilizado pela biometria do SIGO Desktop, adiciona validação Java/JNI, novo launcher seguro, reparo transacional com rollback e tratamento mais conservador do driver biométrico."
              : "Versão atualizada para o ambiente do SIGO Desktop 1.0.48, com melhorias na correção de Java, bibliotecas Nitgen, biometria e driver HFDU06."}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          {isProgramPage ? (
            <>
              <GlowButton href={downloadUrl} external variant="primary">
                Baixar versão 2.0.0
              </GlowButton>
              <GlowButton
                href="#o-que-mudou-na-versao-2"
                variant="secondary"
              >
                Ver o que mudou
              </GlowButton>
            </>
          ) : (
            <GlowButton href={programUrl} variant="primary">
              Conhecer a versão 2.0.0
            </GlowButton>
          )}
        </div>
      </div>
    </div>
  );
}
