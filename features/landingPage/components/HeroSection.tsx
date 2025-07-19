import { Button } from "@/sharedUi/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="container px-4 py-20 mx-auto text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 mb-6 text-sm bg-secondary/50 rounded-full">
          <span className="text-[#ff9a56] font-lg">✨ Welcome:</span>
          <span className="ml-2  text-slate-500">Your one-stop link management solution</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-slate-800">
          One Link For
          <span className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent block">Everything You Are</span>
        </h1>
        
        <p className="text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Share your content, build your audience, and grow your brand with a single, beautiful link that connects to all your social media, websites, and projects.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] border-0 hover:opacity-90 transition-all transform hover:scale-105 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg"
          >
            Create Your LinkHub
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/80 backdrop-blur border-2 border-[#ff9a56]/20 hover:border-[#ff9a56]/40 transition-all px-8 py-3 text-lg rounded-xl text-slate-700"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>10M+ links created</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>500K+ creators</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>99.9% uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
