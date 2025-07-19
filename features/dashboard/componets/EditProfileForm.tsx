"use client"

import { useState, useEffect } from "react"
import { addData } from "@/features/links/actions/addData"
import { getData } from "@/features/links/actions/getData"
import Card from "./Card"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs/"
import { Eye, Link as LinkIcon, Save } from "lucide-react"

export default function EditProfileForm() {
  const [viewToggle, setViewToggle] = useState(false)
  const [data, setData] = useState<any>([])
  const { getUser } = useKindeBrowserClient()
  const user = getUser()

  // Fetch data once user is available
  useEffect(() => {
    const fetchData = async () => {
      const id = user?.id?.toString()
      if (id) {
        const result = await getData(id)
        setData(result)
      }
    }

    if (user?.id) fetchData()
  }, [user])

  return (
    <div className="relative max-w-lg mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Add New Link</h2>

        <button
          onClick={() => setViewToggle(true)}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          <Eye size={18} />
          View Links
        </button>
      </div>

      {/* Modal */}
      {viewToggle && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-3xl">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-h-[80vh] overflow-y-auto w-full max-w-md">
            <Card setViewToggle={() => setViewToggle(false)} data={data} />
          </div>
        </div>
      )}

   
    </div>
  )
}
