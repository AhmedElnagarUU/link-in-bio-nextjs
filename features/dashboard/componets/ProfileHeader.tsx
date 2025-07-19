import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/sharedUi/ui/avatar';

interface SocialLink {
  icon: React.ElementType;
  url: string;
}

interface ProfileHeaderProps {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  socials: SocialLink[];
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, username, avatarUrl, bio, socials }) => {
  return (
    <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2/3 bg-[linear-gradient(135deg,#ff9a56_20%,#ff6b9d_80%)] -z-10 transform -skew-y-6 scale-110"></div>
      <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white shadow-lg z-10 relative">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold text-slate-800 z-10 relative">
        {name}
      </h1>
      <p className="text-lg text-slate-600 mt-1 z-10 relative">@{username}</p>
      {bio && <p className="text-slate-700 mt-4 max-w-md mx-auto z-10 relative">{bio}</p>}
      
      {socials && socials.length > 0 && (
        <div className="flex justify-center space-x-4 mt-6 z-10 relative">
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-slate-800/50 rounded-full p-3 hover:bg-orange-500 transition-all transform hover:scale-110"
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;