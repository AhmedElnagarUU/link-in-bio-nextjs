import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User, { IUser } from '../../../model/User';
import UserProfile, { IUserProfile } from '../../../model/UserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[kindauth]/route';
import mongoose from 'mongoose';

// GET profile by user ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    console.log(`this is the id come from front ${params.id}`)

    if (!session || !session.user || !(session.user).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure the requested profile belongs to the authenticated user
    const requestedId = params.id;
    const sessionUserId = (session.user).id;
    
    if (requestedId !== sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized access to profile' }, { status: 403 });
    }

    const userId = new mongoose.Types.ObjectId(sessionUserId);

    await connectDB();

    // Get user data
    const user = await User.findById(userId).exec() as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get profile data
    const profile = await UserProfile.findOne({ userId: userId }).exec() as IUserProfile | null;

    if (!profile) {
      // Return a default profile structure with user data
      return NextResponse.json({
        userId: user._id,
        name: user.name || '',
        username: user.username,
        email: user.email,
        bio: user.bio || '',
        phone: user.phone || '',
        links: [],
        socials: [],
        views: 0,
        // Default values for fields expected by the frontend
        avatarUrl: '',
        location: '',
        website: '',
      }, { status: 200 });
    }

    // Combine user and profile data
    const combinedProfile = {
      userId: user._id,
      name: user.name || '',
      username: user.username,
      email: user.email,
      bio: user.bio || '',
      phone: user.phone || '',
      // Profile specific data
      links: profile.links || [],
      socials: profile.socials || [],
      views: profile.views || 0,
      // Default values for fields expected by the frontend
      avatarUrl: '',
      location: '',
      website: '',
    };

    return NextResponse.json(combinedProfile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure the requested profile belongs to the authenticated user
    const requestedId = params.id;
    const sessionUserId = (session.user).id;
    
    if (requestedId !== sessionUserId) {
      return NextResponse.json({ error: 'Unauthorized access to profile' }, { status: 403 });
    }

    const userId = new mongoose.Types.ObjectId(sessionUserId);

    await connectDB();

    // Verify user exists
    const user = await User.findById(userId).exec() as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    
    // Log the received data to debug
    console.log("Received profile data:", body);
    console.log("Links data:", body.links);

    // Extract fields that belong to the User model
    const userUpdateData: Partial<IUser> = {};
    if (body.name !== undefined) userUpdateData.name = body.name;
    if (body.bio !== undefined) userUpdateData.bio = body.bio;
    if (body.phone !== undefined) userUpdateData.phone = body.phone;

    // Update user data if needed
    if (Object.keys(userUpdateData).length > 0) {
      await User.findByIdAndUpdate(userId, { $set: userUpdateData }).exec();
      console.log("Updated user data:", userUpdateData);
    }

    // Extract fields that belong to the UserProfile model
    const profileData: Partial<IUserProfile> = {
      userId: userId,
    };
    
    if (body.links !== undefined) profileData.links = body.links;
    if (body.socials !== undefined) profileData.socials = body.socials;
    if (body.views !== undefined) profileData.views = body.views;

    // Update or create profile
    const result = await UserProfile.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          ...profileData,
          updatedAt: new Date()
        },
      },
      { upsert: true, new: true }
    ).exec();

    // Verify the update was successful
    const updatedProfile = await UserProfile.findOne({ userId: userId }).exec() as IUserProfile | null;
    console.log("Updated profile:", updatedProfile);
    console.log("Updated links:", updatedProfile?.links);

    // Get the updated user data
    const updatedUser = await User.findById(userId).exec() as IUser | null;

    // Combine the data for the response
    const combinedData = {
      userId: userId,
      name: updatedUser?.name || '',
      username: updatedUser?.username || '',
      email: updatedUser?.email || '',
      bio: updatedUser?.bio || '',
      phone: updatedUser?.phone || '',
      links: updatedProfile?.links || [],
      socials: updatedProfile?.socials || [],
      views: updatedProfile?.views || 0,
      avatarUrl: '',
      location: '',
      website: '',
    };

    return NextResponse.json({
      message: 'Profile saved successfully',
      result: combinedData
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving profile' }, { status: 500 });
  }
}
