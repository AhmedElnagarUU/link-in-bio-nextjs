import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '../../../model/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await connectDB();
    
    // Create username from name
    const username = name.toLowerCase().replace(/\s/g, '');
    
    const user = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });
    
    const result = await user.save();
    
    return NextResponse.json({ 
      message: 'User created successfully',
      userId: result._id 
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}