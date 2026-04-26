import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { StatsSection } from "@/components/stats-section";
import { PressBar } from "@/components/press-bar";
import { PopularServices } from "@/components/popular-services";
import { HowItWorks } from "@/components/how-it-works";
import { ComparisonTable } from "@/components/comparison-table";
import { LatestGuides } from "@/components/latest-guides";
import { AiCta } from "@/components/ai-cta";
import { CommunityCta } from "@/components/community-cta";
import { WhyChooseUs } from "@/components/why-choose-us";
import { ReviewsGrid } from "@/components/reviews-grid";
import { ServiceAreas } from "@/components/service-areas";
import { UrgencyBanner } from "@/components/urgency-banner";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import { HOME_FAQS } from "@/data/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PressBar />
      <PopularServices />
      <StatsSection />
      <HowItWorks />
      <ComparisonTable />
      <UrgencyBanner />
      <LatestGuides />
      <AiCta />
      <ReviewsGrid />
      <CommunityCta />
      <WhyChooseUs />
      <ServiceAreas />
      <FaqSection
        faqs={HOME_FAQS}
        description="Quick answers to the things people ask us most."
      />
      <FinalCta />
    </>
  );
}
