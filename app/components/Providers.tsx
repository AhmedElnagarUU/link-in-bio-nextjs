"use client";


import { Toaster } from "sonner";
import { ProfileProvider } from "@/contexts/ProfileContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      <ProfileProvider>
        {children}
        <Toaster richColors position="bottom-right" />
      </ProfileProvider>
    
  );
}