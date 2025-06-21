import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILink {
  title: string;
  url: string;
  order?: number;
  isActive?: boolean;
}

export interface ISocial {
  icon: string;
  url: string;
}

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  links: ILink[];
  socials: ISocial[];
  views?: number;
}

const linkSchema = new Schema<ILink>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const socialSchema = new Schema<ISocial>(
  {
    icon: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    links: [linkSchema],
    socials: [socialSchema],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UserProfile: Model<IUserProfile> = mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', userProfileSchema);
export default UserProfile;
