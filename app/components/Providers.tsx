"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ProfileProvider } from "@/contexts/ProfileContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProfileProvider>
        {children}
        <Toaster richColors position="bottom-right" />
      </ProfileProvider>
    </SessionProvider>
  );
}