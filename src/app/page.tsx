import {
  DamaFccHighlight,
  FinalCallToAction,
  GptsPreview,
  HeroSection,
  RecentPosts,
  SiteUpdatesPreview,
  SupportPreview,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SiteUpdatesPreview />
      <DamaFccHighlight />
      <GptsPreview />
      <RecentPosts />
      <SupportPreview />
      <FinalCallToAction />
    </>
  );
}