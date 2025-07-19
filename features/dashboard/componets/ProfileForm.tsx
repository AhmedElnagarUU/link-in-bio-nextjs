"use client"

import { useState } from "react"
import { Save, PlusCircle, Trash, Instagram, Youtube, Globe, ShoppingBag, Coffee } from "lucide-react"

const availableIcons = [
  { name: "Instagram", icon: <Instagram className="w-5 h-5 text-pink-500" /> },
  { name: "Youtube", icon: <Youtube className="w-5 h-5 text-red-500" /> },
  { name: "Globe", icon: <Globe className="w-5 h-5 text-blue-500" /> },
  { name: "Shop", icon: <ShoppingBag className="w-5 h-5 text-green-500" /> },
  { name: "Coffee", icon: <Coffee className="w-5 h-5 text-amber-500" /> },
]

export default function EditProfileForm() {
    return(
        <div>
            <form >
                <label></label>
                <input></input>
            </form>
        </div>
    )
}

