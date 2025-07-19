"use client"

import { Link2, XCircle, Instagram, Youtube, ShoppingBag, Globe, Coffee } from "lucide-react"

export default function Card({
  setViewToggle,
  data
}: {
  setViewToggle: () => void,
  data: any[]
}) {
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-sm w-full mx-auto overflow-hidden bg-white/80 backdrop-blur shadow-2xl border-2 border-slate-200/50 rounded-3xl">
        {/* Header */}
        <div className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] p-8 text-center text-white relative">
          <button
            onClick={setViewToggle}
            className="absolute top-4 right-4 text-white hover:text-red-200 transition"
          >
            <XCircle size={24} />
          </button>

          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold">JD</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Jane Doe</h3>
          <p className="text-white/90 text-sm">Content Creator & Designer ✨</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/30">
            @janedoe
          </span>
        </div>

        {/* Links */}
        <div className="p-6 space-y-3">
          {data && data.length > 0 ? (
            data.map((item: any, index: number) => (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                key={item._id || index}
                className="flex items-center justify-start h-12 px-4 bg-white/80 hover:bg-white border-2 border-slate-200/50 rounded-xl transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
              >
                <Globe className="w-5 h-5 mr-3 text-blue-500" />
                <span className="flex-1 text-left text-slate-700 truncate">{item.title}</span>
              </a>
            ))
          ) : (
            <div className="text-slate-500 text-sm">No links found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
