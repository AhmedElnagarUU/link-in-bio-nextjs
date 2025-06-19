import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/api/auth/[...nextauth]/route'
import { ObjectId } from 'mongodb';

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

    const userId = new ObjectId(sessionUserId);

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

    const userId = new ObjectId(sessionUserId);

    const client = await clientPromise;
    const db = client.db("linkinbio");

    // Verify user exists
    const user = await db.collection("users").findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    
    // Log the received data to debug
    console.log("Received profile data:", body);
    console.log("Links data:", body.links);

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

    // Verify the update was successful
    const updatedProfile = await db.collection("profiles").findOne({ userId: userId });
    console.log("Updated profile:", updatedProfile);
    console.log("Updated links:", updatedProfile?.links);

    return NextResponse.json({ message: 'Profile saved successfully', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error saving profile' }, { status: 500 });
  }
}
