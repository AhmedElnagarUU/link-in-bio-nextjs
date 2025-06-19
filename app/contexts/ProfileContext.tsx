"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Profile } from '@/lib/types';

interface ProfileContextType {
  profileData: Profile | null;
  isLoading: boolean;
  error: string | null;
  refetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<boolean>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Function to fetch profile data
  const fetchProfile = async (force = false) => {
    // Skip fetching if no user is logged in
    if (!userId) {
      setProfileData(null);
      return;
    }

    // Skip fetching if data was recently fetched (within last 5 minutes) and not forced
    const now = Date.now();
    if (
      !force && 
      profileData && 
      lastFetchTime && 
      now - lastFetchTime < 5 * 60 * 1000
    ) {
      console.log("Using cached profile data");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching profile data from API");
      
      const response = await fetch(`/api/profile/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      
      const data = await response.json();
      
      // Only update state if we got valid data
      if (data && !data.error) {
        setProfileData(data);
        setLastFetchTime(now);
      } else if (!data) {
        // Handle case where profile doesn't exist yet
        setProfileData(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update profile data
  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    if (!userId) return false;

    try {
      setIsLoading(true);
      
      // Ensure links array is properly included
      const dataToSend = {
        ...data,
        links: data.links || [],
      };
      
      console.log("Sending profile data to API:", dataToSend);
      
      const response = await fetch(`/api/profile/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Refetch profile data to ensure we have the latest
      await fetchProfile(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error updating profile:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when user logs in
  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        isLoading,
        error,
        refetchProfile: () => fetchProfile(true),
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};