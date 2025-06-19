
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureSection } from "@/components/landing/FeatureSection";
import { PreviewSection } from "@/components/landing/PreviewSection";
import { CTASection } from "@/components/landing/CTASection";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";

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
