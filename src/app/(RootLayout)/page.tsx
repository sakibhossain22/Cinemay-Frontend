import { AppDownloadBanner } from "@/components/dashboard/AppDownloadBanner";
import { FeatureHighlights } from "@/components/dashboard/FeatureHighLight";
import { HelpSupportSection } from "@/components/dashboard/HelpAndSupport";
import { PricingSection } from "@/components/dashboard/PricingSection";
import HomePageCarousel from "@/components/home/HomePageCarousel";
import MultiHomeSection from "@/components/home/MultiHomeSection";

async function HomePage() {

  return (
    <div>
      <div>
        <HomePageCarousel />
        <MultiHomeSection />
        <PricingSection />
        <AppDownloadBanner />
        <FeatureHighlights />
        <HelpSupportSection />
      </div>
    </div>
  )
}

export default HomePage
