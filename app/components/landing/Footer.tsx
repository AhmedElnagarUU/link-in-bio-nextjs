import { Link2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-red-200/50 bg-white/50 backdrop-blur">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] flex items-center justify-center">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent">HyparBIO</span>
            </div>
            <p className="text-slate-500 text-sm">
              The simplest way to share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-slate-800">Support</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200/30 mt-8 pt-8 text-center text-sm text-slate-600">
          <p>&copy; 2025 HyparBIO. All rights reserved. Made with ❤️ for creators worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
