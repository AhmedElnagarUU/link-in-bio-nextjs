
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Twitter, Instagram, Facebook, Linkedin, Github, Youtube, Mail } from 'lucide-react';
import { SocialLink, Link as LinkType } from '@/lib/types';

interface UserProfile {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  socials: SocialLink[];
  links: LinkType[];
}

// Function to get the appropriate icon for a social platform
const getSocialIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Twitter: <Twitter className="w-5 h-5 mr-3 text-[#1DA1F2]" />,
    Instagram: <Instagram className="w-5 h-5 mr-3 text-[#E1306C]" />,
    Facebook: <Facebook className="w-5 h-5 mr-3 text-[#4267B2]" />,
    Linkedin: <Linkedin className="w-5 h-5 mr-3 text-[#0077B5]" />,
    Github: <Github className="w-5 h-5 mr-3 text-[#333]" />,
    Youtube: <Youtube className="w-5 h-5 mr-3 text-[#FF0000]" />,
    Mail: <Mail className="w-5 h-5 mr-3 text-[#EA4335]" />
  };

  return iconMap[iconName] || <Globe className="w-5 h-5 mr-3 text-blue-500" />;
};

const ViewProfilePage = ({ params }: { params: { id: string } }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/profile/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          fetch('/api/analytics', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profileId: params.id }),
          });
        });
    }
  }, [params.id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff5f0_0%,#ffe8f5_100%)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm mx-auto">
        <Card className="overflow-hidden bg-white/80 backdrop-blur shadow-2xl border-2 border-slate-200/50">
          <CardContent className="p-0">
            {/* Profile Header */}
            <div className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] p-8 text-center text-white">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">{user.name?.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{user.name}</h3>
              <p className="text-white/90 text-sm">{user.bio}</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                @{user.username}
              </Badge>
            </div>
            
            {/* Social Links */}
            {user.socials && user.socials.length > 0 && (
              <div className="p-6 pb-2">
                <h4 className="text-sm font-medium text-slate-500 mb-3">SOCIAL PROFILES</h4>
                <div className="space-y-3">
                  {user.socials.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {typeof social.icon === 'string' ? getSocialIcon(social.icon) : <Globe className="w-5 h-5 mr-3 text-blue-500" />}
                      <span className="flex-1 text-left text-slate-700">
                        {typeof social.icon === 'string' ? social.icon : 'Social Link'}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Custom Links */}
            {user.links && user.links.length > 0 && (
              <div className="px-6 pb-6">
                <h4 className="text-sm font-medium text-slate-500 mb-3">MY LINKS</h4>
                <div className="space-y-3">
                  {user.links.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
                      onClick={() => window.open(link.url, '_blank')}
                    >
                      <Globe className="w-5 h-5 mr-3 text-blue-500" />
                      <span className="flex-1 text-left text-slate-700">{link.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Footer */}
            <div className="px-6 pb-6 text-center">
              <p className="text-xs text-slate-500">
                Created with HyperBIO ❤️
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewProfilePage;