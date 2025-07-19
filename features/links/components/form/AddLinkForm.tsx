import { LinkIcon, Save } from "lucide-react";
import { addData } from "../../actions/addData";


export default function AddLinkForm(){
    return(
        <>
           {/* Form */}
      <form action={addData} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="title" className="text-sm font-medium text-slate-700 flex items-center gap-1">
            <LinkIcon size={16} className="text-orange-500" />
            Link Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="e.g. My Portfolio"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-4 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="link" className="text-sm font-medium text-slate-700">URL</label>
          <input
            type="url"
            name="link"
            id="link"
            required
            placeholder="https://yourlink.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 px-4 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-medium hover:opacity-90 shadow-md hover:shadow-lg"
        >
          <Save size={18} />
          Save Link
        </button>
      </form>
      </>
    )
}