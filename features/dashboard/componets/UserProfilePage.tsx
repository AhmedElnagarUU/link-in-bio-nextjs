"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import ProfileNavbar from "@/sharedUi/customUi/DashboardNavbar"
import EditProfileForm from "./EditProfileForm"
import { useEffect, useState } from "react"

export default function UserProfilePage() {
  const { user, isAuthenticated } = useKindeBrowserClient()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isAuthenticated && !isLoading) {
    // In a real app, you might want to redirect to login
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-orange-500">!</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Authentication Required</h2>
          <p className="text-slate-600 mb-6">Please log in to access your profile.</p>
          <a 
            href="/login" 
            className="inline-flex items-center justify-center px-5 py-2.5 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <ProfileNavbar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-16 md:pt-6 ml-0 md:ml-20 transition-all duration-300">
          {isLoading ? (
            <div className="flex items-center justify-center h-[80vh]">
              <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">Welcome, {user?.given_name || 'User'}!</h1>
                <p className="text-slate-600">Manage your links and customize your profile.</p>
              </div>
              
              <EditProfileForm />
            </>
          )}
        </main>
      </div>
    </div>
  )
}