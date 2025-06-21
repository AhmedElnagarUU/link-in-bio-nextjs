import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name?: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  totalVisitors: number;
}

const userSchema = new Schema<IUser>(
  {
    name: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    bio: String,
    totalVisitors: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
