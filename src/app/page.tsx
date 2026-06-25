import {
  AvailableNow,
  DamaFccHighlight,
  FeaturedPrograms,
  FinalCallToAction,
  GptsPreview,
  HeroSection,
  LatestUpdates,
  RecentPosts,
  ReferencesPreview,
  SiteUpdatesPreview,
  SupportPreview,
  WhatYouFind,
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
