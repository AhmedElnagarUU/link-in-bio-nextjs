import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User, { IUser } from '../../../model/User';
import UserProfile, { IUserProfile } from '../../../model/UserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

// GET profile by user ID
export async function GET(
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

    // Get user data
    const user = await User.findById(userId).exec() as IUser | null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get profile data
    const profile = await UserProfile.findOne({ userId: userId }).exec() as IUserProfile | null;

    if (!profile) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(profile);
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

    // Update or create profile
    const result = await UserProfile.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          ...body,
          userId: userId,
          updatedAt: new Date()
        },
      },
      { upsert: true, new: true }
    ).exec();

    // Verify the update was successful
    const updatedProfile = await UserProfile.findOne({ userId: userId }).exec() as IUserProfile | null;
    console.log("Updated profile:", updatedProfile);
    console.log("Updated links:", updatedProfile?.links);

    return NextResponse.json({ message: 'Profile saved successfully', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving profile' }, { status: 500 });
  }
}
