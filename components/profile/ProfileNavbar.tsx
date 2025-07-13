"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut, Link2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileNavbar() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur shadow-md border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* App Name */}
        <div className="flex items-center space-x-2 text-primary font-bold text-xl">
          <Link2 className="w-6 h-6" />
          <span>Lynqur</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="text-slate-800 font-medium">
            {isAuthenticated ? `Welcome, ${user?.given_name || user?.email}` : "Welcome"}
          </div>
          <LogoutLink>
            <button className="flex items-center bg-red-100 text-red-600 hover:bg-red-200 transition px-3 py-2 rounded-xl font-medium">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </LogoutLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center">
          <div className="text-slate-800 font-medium">
            {isAuthenticated ? `Welcome, ${user?.given_name || user?.email}` : "Welcome"}
          </div>
          <LogoutLink>
            <button className="flex items-center mx-auto bg-red-100 text-red-600 hover:bg-red-200 transition px-4 py-2 rounded-xl font-medium">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </LogoutLink>
        </div>
      )}
    </nav>
  );
}
