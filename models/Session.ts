import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  sessionId: string;
  userId: string;
  username?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  lastActiveAt: Date;
  active: boolean;
  revoked: boolean;
  ip?: string;
  userAgent?: string;
  data?: any;
}

const SessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    username: { type: String },
    role: { type: String },
    expiresAt: { type: Date, required: true },
    lastActiveAt: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    revoked: { type: Boolean, default: false },
    ip: { type: String },
    userAgent: { type: String },
    data: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.models.Session ||
  mongoose.model<ISession>("Session", SessionSchema);
