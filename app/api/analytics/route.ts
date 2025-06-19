import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { profileId } = await request.json();
    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("linkinbio");
    
    const result = await db.collection("profiles").updateOne(
      { _id: new ObjectId(profileId) },
      { $inc: { views: 1 } }
    );

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error updating view count' }, { status: 500 });
  }
}