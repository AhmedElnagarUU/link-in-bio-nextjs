import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route'
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = new ObjectId((session.user).id);

    const client = await clientPromise;
    const db = client.db("linkinbio");

    // Verify user exists
    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();

    // Update or create profile
    const result = await db.collection("profiles").updateOne(
      { userId: userId },
      {
        $set: {
          ...body,
          userId: userId,
          updatedAt: new Date()
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Profile saved successfully', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving profile' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = new ObjectId((session.user).id);

    const client = await clientPromise;
    const db = client.db("linkinbio");

    // Get user data
    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get profile data
    const profile = await db.collection("profiles").findOne({ userId: userId });

    if (!profile) {
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(profile);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 });
  }
}