import Link from "next/link";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { PublicServiceImage } from "@/components/public-utility/PublicServiceCard";
import { cabs, publicUtilityDisclaimer } from "@/data/publicServices";
import { createPageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/blog";
import styles from "@/components/public-utility/public-utility.module.css";

export const metadata = createPageMetadata({
  title: "CABS — informação de utilidade pública | Dama Universe",
  description: "Divulgação independente na Dama Universe sobre o CABS/Sejusp-MS: público atendido, serviços, Carreta da Saúde e canais oficiais. Sem agendamento pelo site.",
  path: cabs.detailsUrl,
});

export default function CabsPage() {
  return (
    <EditorialShell>
      <Link href="/utilidade-publica" className={`${styles.textLink} ${styles.backLink}`}>← Voltar à Utilidade Pública</Link>
      <EditorialIntro eyebrow="Utilidade Pública · Sejusp/MS" title="CABS" lead={cabs.fullName} description={cabs.summary} />
      <section aria-labelledby="presentation-title" className={styles.detailHero}>
        <div>
          <h2 id="presentation-title">Cuidado com quem protege</h2>
          <p>{cabs.introduction}</p>
          <a href={cabs.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>Consultar página oficial <span aria-hidden="true">↗</span></a>
        </div>
        <PublicServiceImage service={cabs} caption />
      </section>
      <aside className={styles.notice}>{publicUtilityDisclaimer}</aside>
      <div className={styles.columns}>
        <section className={styles.section} aria-labelledby="audience-title">
          <h2 id="audience-title">Quem pode ser atendido</h2>
          <p>O público divulgado pela Sejusp/MS abrange os servidores da segurança pública do estado:</p>
          <ul>{cabs.audience.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className={styles.section} aria-labelledby="care-title">
          <h2 id="care-title">Serviços divulgados</h2>
          <ul>{cabs.services.map(item => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <section className={styles.section} aria-labelledby="mobile-unit-title">
        <h2 id="mobile-unit-title">Carreta da Saúde</h2>
        <p>{cabs.mobileUnit}</p>
      </section>
      <section className={styles.section} aria-labelledby="contacts-title">
        <h2 id="contacts-title">Contatos e localização</h2>
        <p>Fale diretamente com a unidade para consultar condições de atendimento, programação e horários antes do deslocamento.</p>
        <div className={styles.contacts}>
          <a href={cabs.phoneUrl} className={styles.contactLink}>Ligar para o CABS</a>
          <a href={cabs.whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>WhatsApp do CABS <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${cabs.email}`} className={styles.contactLink}>Enviar e-mail ao CABS</a>
        </div>
        <address className={styles.address}>
          <p>Telefone / WhatsApp: {cabs.phone}</p>
          <p>E-mail: {cabs.email}</p>
          <p>{cabs.address}</p>
        </address>
      </section>
      <section className={styles.section} aria-labelledby="source-title">
        <h2 id="source-title">Fonte e conferência</h2>
        <p>Síntese editorial baseada na <a href={cabs.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.textLink}>página oficial do CABS na Sejusp/MS <span aria-hidden="true">↗</span></a>.</p>
        <p>Última conferência das informações: <time dateTime={cabs.verifiedAt}>{formatDate(cabs.verifiedAt)}</time>. Informações e condições podem mudar; confirme com a instituição. O número de WhatsApp também está indicado no banner do CABS.</p>
      </section>
    </EditorialShell>
  );
}
