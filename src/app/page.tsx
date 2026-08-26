import {
  DamaFccHighlight,
  FinalCallToAction,
  GptsPreview,
  HeroSection,
  RecentPosts,
  SiteUpdatesPreview,
  SupportPreview,
} from "@/components/home";
import { BiometriaUpdateBanner } from "@/components/updates";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section
        id="atualizacao-biometria-2"
        className="relative z-10 -mt-8 scroll-mt-24 pb-4 sm:-mt-10 sm:pb-6"
      >
        <div className="container-site">
          <BiometriaUpdateBanner variant="home" />
        </div>
      </section>
      <SiteUpdatesPreview />
      <DamaFccHighlight />
      <GptsPreview />
      <RecentPosts />
      <SupportPreview />
      <FinalCallToAction />
    </>
  );
}
