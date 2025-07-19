"use client";

import { useKindeBrowserClient, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut, Link2, Menu, ChevronLeft, ChevronRight, BarChart2, Settings, User, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfileNavbar() {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if current path is active
  const isActive = (path: string) => {
    if (typeof window !== 'undefined') {
      return window.location.pathname === path;
    }
    return false;
  };

  // Handle screen resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Mobile menu toggle button - visible only on mobile */}
      {!menuOpen && (
        <button
          className="fixed top-4 left-4 z-10 md:hidden bg-white p-2 rounded-lg shadow-md"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      )}

      {/* Backdrop overlay - only on mobile when menu is open */}
      {menuOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative h-screen bg-white shadow-md md:shadow-sm border-r border-slate-200 transition-all duration-300 z-20 ${
        menuOpen
          ? "w-[85vw] max-w-[300px] translate-x-0"
          : "w-0 md:w-20 -translate-x-full md:translate-x-0"
      } flex flex-col overflow-hidden`}>
        {/* Logo & App Name */}
        <div className="flex items-center space-x-3 px-4 py-5 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-pink-50">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{
              background: "linear-gradient(135deg,#ff9a56 0%,#ff6b9d 100%)",
            }}
          >
            <Link2 className="w-5 h-5 text-white" />
          </div>
          {menuOpen && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-700">Lynqur</span>
              <span className="text-xs text-slate-500">Link Management</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          className="absolute right-4 top-5 md:static md:mt-2 md:self-end md:mr-4 text-slate-600 hover:text-orange-500 p-2 rounded-full md:bg-transparent"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {menuOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Main Navigation */}
        <div className="flex-1 mt-4 px-3">
          {/* Main Navigation */}
          <div className="mb-6">
            <div className="text-xs font-medium text-slate-500 px-3 py-2 mb-1">
              {menuOpen ? "MAIN NAVIGATION" : ""}
            </div>
            
            <div className="space-y-1">
              <Link
                href="/dashboard/links"
                className={`flex items-center space-x-3 px-3 py-3 md:py-2.5 rounded-lg transition-colors ${
                  isActive('/dashboard/links')
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <Link2 className={`w-5 h-5 ${isActive('/') ? "text-orange-500" : "text-slate-500"}`} />
                {menuOpen && <span className="font-medium">My Links</span>}
              </Link>

                
              <Link
                href="/dashboard/profile"
                className={`flex items-center space-x-3 px-3 py-3 md:py-2.5 rounded-lg transition-colors ${
                  isActive('/dashboard/profile')
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <User className={`w-5 h-5 ${isActive('/profile') ? "text-orange-500" : "text-slate-500"}`} />
                {menuOpen && <span className="font-medium">Profile</span>}
              </Link>
            
              <Link
                href="/dashboard/analytics"
                className={`flex items-center space-x-3 px-3 py-3 md:py-2.5 rounded-lg transition-colors ${
                  isActive('/analytics')
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <BarChart2 className={`w-5 h-5 ${isActive('/analytics') ? "text-orange-500" : "text-slate-500"}`} />
                {menuOpen && <span className="font-medium">Analytics</span>}
              </Link>
            </div>
          

            
            
          </div>
        </div>

        {/* User Profile Section */}
        {isAuthenticated && user && (
          <div className="mt-auto px-3 pb-5 pt-3 border-t border-slate-100 bg-slate-50">
            <div className="flex items-center space-x-3 px-2 py-2 mb-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.given_name || "User"}
                  className="w-8 h-8 rounded-full border border-white shadow-sm"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-white shadow-sm">
                  <span className="text-sm font-medium text-orange-600">
                    {user.given_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </span>
                </div>
              )}
              
              {menuOpen && (
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[180px] md:max-w-[140px]">
                    {user.given_name || user.email?.split('@')[0] || "User"}
                  </span>
                  <span className="text-xs text-slate-500 truncate max-w-[180px] md:max-w-[140px]">
                    {user.email || ""}
                  </span>
                </div>
              )}
            </div>
            
            <LogoutLink>
              <button className="flex items-center w-full space-x-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors px-3 py-3 md:py-2.5 rounded-lg font-medium">
                <LogOut className="w-4 h-4" />
                {menuOpen && <span>Logout</span>}
              </button>
            </LogoutLink>
          </div>
        )}
      </aside>
    </>
  );
}
