import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User, { IUser } from '../../../../model/User';
import UserProfile, { IUserProfile } from '../../../../model/UserProfile';

// GET public profile by username
export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await connectDB();

    // Get user by username
    const user = await User.findOne({ username }).exec() as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get profile data
    const profile = await UserProfile.findOne({ userId: user._id }).exec() as IUserProfile | null;

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Return combined user and profile data
    const publicProfile = {
      name: user.name,
      username: user.username,
      bio: user.bio,
      avatarUrl: '', // You can add avatar functionality later
      socials: profile.socials || [],
      links: profile.links || [],
      views: profile.views || 0,
    };

    return NextResponse.json(publicProfile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
} 