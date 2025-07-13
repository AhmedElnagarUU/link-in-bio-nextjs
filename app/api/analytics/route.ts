import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User, { IUser } from '../../../model/User';
import UserProfile from '../../../model/UserProfile';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await connectDB();
    
    // Get user by username
    const user = await User.findOne({ username }).exec() as IUser | null;
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update profile views
    const result = await UserProfile.findOneAndUpdate(
      { userId: user._id },
      { $inc: { views: 1 } },
      { new: true }
    ).exec();

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error updating view count' }, { status: 500 });
  }
}