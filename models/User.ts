import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
