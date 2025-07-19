import { Card, CardContent } from "@/sharedUi/ui/card";
import { Badge } from "@/sharedUi/ui/badge";
import { Link2, Users, Smartphone, Zap, BarChart3, Palette, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Unlimited Links",
    description: "Create and manage unlimited links for all your social media profiles, websites, online stores, and creative portfolios.",
    badge: "Popular"
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Transform your page with stunning themes, personalized color schemes, and custom branding elements.",
    badge: "Coming Soon"
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Gain valuable insights with comprehensive analytics tracking clicks, views, and user engagement metrics.",
    badge: "Coming Soon"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Experience flawless performance across all devices with our cutting-edge responsive design.",
    badge: null
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Enjoy instant loading speeds powered by our global CDN and optimized infrastructure.",
    badge: null
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description: "Strengthen your brand presence with custom domain names that build credibility and trust.",
    badge: "Coming Soon"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Rest easy with military-grade security featuring SSL encryption and advanced privacy features.",
    badge: null
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enhance productivity with seamless team collaboration tools for managing and optimizing links.",
    badge: "Coming Soon"
  }
];

export const FeatureSection = () => {
  return (
    <section id="features" className="container px-4 py-20 mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">
          Everything You Need to
          <span className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent block">Connect & Convert</span>
        </h2>
        <p className="text-2xl text-slate-400 max-w-2xl mx-auto">
          Powerful features designed to help you share your content beautifully and track what matters most.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur border-0 shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                {feature.badge && (
                  <Badge variant="secondary" className="text-xs text-red-500 bg-red-300/20 border-red-500">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-slate-800 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed tracking-wide">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
