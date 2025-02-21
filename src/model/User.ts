import { Schema, model } from 'mongoose';

export interface IUser extends Schema {
  userId: number;
  action: string;
  status: 'user' | 'admin';
  token?: string;
  _id: Schema.Types.ObjectId;
}

export const userStatus = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

const UserSchema = new Schema<IUser>({
  userId: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    default: '',
  },
  token: String,
  status: {
    type: String,
    enum: [userStatus.USER, userStatus.ADMIN],
    default: userStatus.USER,
  },
});

const User = model<IUser>('User', UserSchema);

export default User;