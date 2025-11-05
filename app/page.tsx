import NavbarHome from "@/app/components/navbarHome";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <NavbarHome />
        <main>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
        <FooterSection />
      </div>
    </>
  );
}
