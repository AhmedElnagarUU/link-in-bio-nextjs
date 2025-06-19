import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await clientPromise;
    const db = client.db("linkinbio");
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      name,
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}