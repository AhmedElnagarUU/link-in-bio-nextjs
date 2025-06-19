'use client';

import React, { useEffect, useState } from 'react';
import {
  Trash2, PlusCircle,
  Twitter, Instagram, Facebook, Linkedin, Github, LucideIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/contexts/ProfileContext';

const iconMap: { [key: string]: LucideIcon } = {
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Github,
};

const EditProfileForm = () => {
  const { profileData, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio: '',
    email: '',
    phone: '',
    socials: [] as { icon: LucideIcon; url: string }[],
    links: [] as { title: string; url: string }[]
  });

  const router = useRouter();

  // Initialize form with profile data when available
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        username: profileData.username || '',
        bio: profileData.bio || '',
        email: profileData.email || '',
        phone: profileData.phone || '',
        socials: profileData.socials?.map((s: { icon: string; url: string }) => ({
          icon: iconMap[s.icon] || Twitter,
          url: s.url
        })) || [],
        links: profileData.links || []
      });
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty links
    const filteredLinks = formData.links.filter(link => link.title.trim() !== '' && link.url.trim() !== '');
    
    const updatedData = {
      ...formData,
      // Explicitly include links array to ensure it's saved
      links: filteredLinks,
      socials: formData.socials.map(s => ({
        icon: Object.keys(iconMap).find(key => iconMap[key] === s.icon) || 'Twitter',
        url: s.url
      }))
    };

    console.log("Submitting profile data:", updatedData);
    const success = await updateProfile(updatedData);

    if (success) {
      toast.success("Profile Saved!", {
        description: "Your changes have been saved successfully.",
      });
      router.push('/profile');
    } else {
      toast.error("Error", {
        description: "There was an error saving your profile.",
      });
    }
  };

  const handleLinkChange = (index: number, field: 'title' | 'url', value: string) => {
    const updatedLinks = [...formData.links];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, links: updatedLinks });
  };

  const handleSocialChange = (index: number, field: 'icon' | 'url', value: string) => {
    const updatedSocials = [...formData.socials];
    if (field === 'icon') {
      updatedSocials[index].icon = iconMap[value] || Twitter;
    } else {
      updatedSocials[index].url = value;
    }
    setFormData({ ...formData, socials: updatedSocials });
  };

  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { title: '', url: '' }]
    }));
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const handleAddSocial = () => {
    setFormData(prev => ({
      ...prev,
      socials: [...prev.socials, { icon: Twitter, url: '' }]
    }));
  };

  const handleRemoveSocial = (index: number) => {
    const newSocials = formData.socials.filter((_, i) => i !== index);
    setFormData({ ...formData, socials: newSocials });
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              placeholder="username"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all resize-none"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Social Links</h3>
          {formData.socials.map((social, index) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                value={Object.keys(iconMap).find(key => iconMap[key] === social.icon)}
                onChange={(e) => handleSocialChange(index, 'icon', e.target.value)}
                className="rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-3 text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              >
                {Object.keys(iconMap).map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
              <input
                type="text"
                value={social.url}
                onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                className="flex-1 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => handleRemoveSocial(index)}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSocial}
            className="flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
          >
            <PlusCircle size={16} className="mr-1" /> Add Social Link
          </button>
        </div>

        {/* Custom Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800">Custom Links</h3>
          {formData.links.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={link.title}
                onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                className="w-1/3 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                placeholder="Link Title"
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                className="flex-1 rounded-lg border-2 border-slate-200 bg-white/80 backdrop-blur-sm py-2 px-4 text-slate-700 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => handleRemoveLink(index)}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLink}
            className="flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors"
          >
            <PlusCircle size={16} className="mr-1" /> Add Custom Link
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
