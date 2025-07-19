import { Card, CardContent } from "@/sharedUi/ui/card";
import { Button } from "@/sharedUi/ui/button";
import { Badge } from "@/sharedUi/ui/badge";
import { Instagram, Youtube, Globe, ShoppingBag, Coffee } from "lucide-react";

export const PreviewSection = () => {
  return (
    <section id="preview" className="container px-4 py-20 mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
          See It In Action
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Here&apos;s how your LinkHub page could look. Beautiful, professional, and completely customizable.
        </p>
      </div>
      
      <div className="max-w-sm mx-auto">
        <Card className="overflow-hidden bg-white/80 backdrop-blur shadow-2xl border-2 border-slate-200/50">
          <CardContent className="p-0">
            {/* Profile Header */}
            <div className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] p-8 text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Jane Doe</h3>
              <p className="text-white/90 text-sm">
                Content Creator & Designer ✨
              </p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                @janedoe
              </Badge>
            </div>
            
            {/* Links */}
            <div className="p-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <Instagram className="w-5 h-5 mr-3 text-pink-500" />
                <span className="flex-1 text-left text-slate-700">Follow me on Instagram</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <Youtube className="w-5 h-5 mr-3 text-red-500" />
                <span className="flex-1 text-left text-slate-700">Latest YouTube Video</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5 mr-3 text-green-500" />
                <span className="flex-1 text-left text-slate-700">Shop My Collection</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <Globe className="w-5 h-5 mr-3 text-blue-500" />
                <span className="flex-1 text-left text-slate-700">My Portfolio Website</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <Coffee className="w-5 h-5 mr-3 text-amber-500" />
                <span className="flex-1 text-left text-slate-700">Buy Me a Coffee</span>
              </Button>
            </div>
            
            {/* Footer */}
            <div className="px-6 pb-6 text-center">
              <p className="text-xs text-slate-500">
                Created with LinkHub ❤️
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
