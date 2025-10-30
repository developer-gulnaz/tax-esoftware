import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IAdmin extends mongoose.Document {
  username: string;
  password: string;
  role: string;
  gpCode: string;
  gpName: string;
  address?: string;
  village?: string;
  tehsil?: string;
  district?: string;
  pincode?: number;
  phone?: number;
  mobile?: number;
  email?: string;
  profileImg?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gpCode: { type: String, required: true },
    gpName: { type: String, required: true },

    address: { type: String, default: "" },
    village: { type: String, default: "" },
    tehsil: { type: String, default: "" },
    district: { type: String, default: "" },
    pincode: { type: Number, default: 0 },
    phone: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    email: { type: String, default: "" },
    profileImg: {
      type: String,
      default: "/images/default-profile.png", // ✅ You can store a default avatar in /public/images/
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt & updatedAt
  }
);

// ✅ Hash password before saving
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Compare passwords
AdminSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
