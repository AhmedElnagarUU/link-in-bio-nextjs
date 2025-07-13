"use client";
import { RegisterLink, LoginLink , LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
import { Link2, User, LogOut } from "lucide-react";
import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';

export const Header = () => {
  const {user , isAuthenticated}=useKindeBrowserClient();
  console.log(`this is the user from landing page  ${user}`);
  console.log(isAuthenticated);
  // const { data: session } = useSession();
  // console.log(session)

  return (
    <header className="sticky top-0 z-50 w-full border-red-400/20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="flex-1">
          <Link href="/" className="flex  items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] bg-clip-text text-transparent">HyperBIO</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
          <a href="#features" className="text-base font-medium transition-colors hover:text-primary">
            Features
          </a>
          <a href="#preview" className="text-base font-medium transition-colors hover:text-primary">
            Preview
          </a>
          <a href="#pricing" className="text-base font-medium transition-colors hover:text-primary">
            Pricing
          </a>
        </nav>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {isAuthenticated ? (
            <>
              <Link href="/profile" className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] hover:opacity-90 transition-all text-white">
                <User className="h-5 w-5" />
                <span>i delete thid </span>
              </Link>
              <LogoutLink>
              <Button variant="logout" size="sm" onClick={() => console.log(`thid will by logout`)}>
                <LogOut className="h-5 w-5" />
              </Button>
              </LogoutLink>
            </>
          ) : (
            <>
              <LoginLink>
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </LoginLink>
              <RegisterLink>
                <Button size="sm" className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] text-white border-0 hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
