
import { Button } from "@/sharedUi/ui/button";
import { ArrowRight, Check } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="container px-4 py-20 mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff7b7b_50%,#ff6b9d_100%)] rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Simplify Your Online Presence?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators, entrepreneurs, and influencers who trust LinkHub to connect with their audience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-orange-500 hover:bg-white/90 transition-all transform hover:scale-105 px-8 py-3 text-lg font-semibold rounded-xl shadow-lg"
              >
                Start For Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 transition-all px-8 py-3 text-lg rounded-xl"
              >
                View Pricing
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
