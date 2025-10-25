import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin extends mongoose.Document {
  gramPanchayat: string;
  username: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  gramPanchayat: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// ✅ Hash password before save
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Method to check password
AdminSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
