
import { HeroSection } from "@/features/landingPage/components/HeroSection";
import { FeatureSection } from "@/features/landingPage/components/FeatureSection";
import { PreviewSection } from "@/features/landingPage/components/PreviewSection";
import { CTASection } from "@/features/landingPage/components/CTASection";
import { Header } from "@/features/landingPage/components/Header";
import { Footer } from "@/features/landingPage/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
    <Header />      
    <HeroSection />
    <FeatureSection />
    <PreviewSection />
    <CTASection />
    <Footer />
    </div>
  );
}
