export const dynamic = 'force-static'; // এটি যোগ করুন

import ChatBot from "@/components/ChatBot";
import { AppDownloadBanner } from "@/components/dashboard/AppDownloadBanner";
import { FeatureHighlights } from "@/components/dashboard/FeatureHighLight";
import { HelpSupportSection } from "@/components/dashboard/HelpAndSupport";
import { PricingSection } from "@/components/dashboard/PricingSection";
import HomePageCarousel from "@/components/home/HomePageCarousel";
import MultiHomeSection from "@/components/home/MultiHomeSection";
import TestimonialsPage from "@/components/Testimonials";

async function HomePage() {

  return (
    <div>
      <div>
        <HomePageCarousel />
        <MultiHomeSection />
        <PricingSection />
        <AppDownloadBanner />
        <FeatureHighlights />
        <TestimonialsPage />
        <HelpSupportSection />
        <ChatBot />
      </div>
    </div>
  )
}

export default HomePage
