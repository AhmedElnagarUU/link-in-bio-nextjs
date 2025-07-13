'use client'

import { addData } from "@/action/addData"

export default function EditProfileForm() {
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>

      <form action={addData} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Link Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="e.g. My Portfolio"
            className="w-full rounded-lg border-2 border-slate-200 bg-white py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
            required
          />
        </div>

        {/* URL */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">Link URL</label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://example.com"
            className="w-full rounded-lg border-2 border-slate-200 bg-white py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          Save Link
        </button>
      </form>
    </div>
  );
}
