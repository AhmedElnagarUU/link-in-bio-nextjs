"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Copy, LayoutDashboard, Link2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/sharedUi/ui/button";
import { toast } from "sonner"; // Replace with your toast lib if different
import Link from "next/link";

export default function DashboardStarter() {
  const { user } = useKindeBrowserClient();
  const [copied, setCopied] = useState(false);

  const publicLink = `https://lynqur.com/${user?.given_name || user?.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicLink);
    setCopied(true);
    toast.success("Public link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-6xl md:min-w-3xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-pink-500" />
          Welcome back, {user?.given_name || user?.email}
        </h1>
        <p className="text-slate-500">Manage your profile and public links here.</p>
      </div>

      {/* Copy Public Link Section */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500 mb-1">Your public link:</p>
          <p className="text-slate-800 font-medium break-all">{publicLink}</p>
        </div>

        <Button
          onClick={handleCopy}
          className="ml-4 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg,#ff9a56 0%,#ff6b9d 100%)",
            color: "#fff",
          }}
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* Example Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/dashboard/links"
          className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold px-6 py-4 rounded-xl shadow hover:opacity-90 transition"
        >
          Manage Your Links
        </Link>
        <Link
          href="/dashboard/profile"
          className="bg-white border border-slate-200 hover:border-pink-400 text-slate-700 px-6 py-4 rounded-xl shadow-sm hover:shadow transition font-medium"
        >
          Manage Your Profile 
        </Link>

        <Link
    href={`/u/${user?.given_name || user?.id}`} // adjust this path based on how your public URLs are structured
    target="_blank"
    className="bg-white border border-slate-200 hover:border-green-400 text-slate-700 px-6 py-4 rounded-xl shadow-sm hover:shadow transition font-medium flex items-center justify-center gap-2"
  >
    <span>View Public Profile</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-green-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
    </svg>
  </Link>
      </div>
    </div>
  );
}
