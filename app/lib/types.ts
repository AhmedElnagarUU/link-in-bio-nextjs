import { LucideIcon } from 'lucide-react';



declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email?: string | null;
  }
}


export interface SocialLink {
  icon: LucideIcon | string;
  url: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Profile {
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  socials: SocialLink[];
  links: Link[];
  views: number;
}