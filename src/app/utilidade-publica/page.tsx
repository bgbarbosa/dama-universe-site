import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { PublicServiceCard } from "@/components/public-utility/PublicServiceCard";
import { publicServices, publicUtilityDisclaimer, publicUtilityIntroduction } from "@/data/publicServices";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/components/public-utility/public-utility.module.css";

export const metadata = createPageMetadata({
  title: "Utilidade Pública | Dama Universe",
  description: "Divulgação independente na Dama Universe: informações e canais oficiais de serviços de interesse público. Conheça o CABS da Sejusp/MS.",
  path: "/utilidade-publica",
});

export default function PublicUtilityPage() {
  return (
    <EditorialShell>
      <EditorialIntro eyebrow="Informação e cuidado" title="Utilidade Pública" description={publicUtilityIntroduction} />
      <section aria-labelledby="services-title">
        <h2 id="services-title" className="sr-only">Serviços divulgados</h2>
        {publicServices.map(service => <PublicServiceCard key={service.slug} service={service} />)}
      </section>
      <aside className={styles.notice}>{publicUtilityDisclaimer}</aside>
    </EditorialShell>
  );
}
