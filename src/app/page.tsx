import { HeroSection } from "@/components/home/HeroSection";
import { ExploreNeeds } from "@/components/home/ExploreNeeds";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { GptsPreview } from "@/components/home/GptsPreview";
import { SiteUpdatesPreview } from "@/components/home/SiteUpdatesPreview";
import { ContentPreview } from "@/components/home/ContentPreview";
import { FinalCallToAction } from "@/components/home/FinalCallToAction";
import { createPageMetadata } from "@/lib/seo";
import styles from "@/components/home/home.module.css";

export const metadata = createPageMetadata({
  title: "Dama Universe — Programas, IA aplicada e automação",
  description: "Projeto, marca e ecossistema autoral de Marco Barbosa. Conheça programas, ferramentas de IA, conteúdos técnicos, referências e a evolução de soluções digitais.",
  path: "/",
});

export default function HomePage() {
  return <main id="conteudo" tabIndex={-1} className={styles.home}>
    <HeroSection />
    <ExploreNeeds />
    <FeaturedPrograms />
    <GptsPreview />
    <SiteUpdatesPreview />
    <ContentPreview />
    <FinalCallToAction />
  </main>;
}
