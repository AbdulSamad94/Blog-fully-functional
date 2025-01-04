import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
  bio: string;
  email: string;
  image?: string;
  followers?: string[];
  Bannerimage: {
    id: string;
    url: string;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    bio: { type: String, default: "This user hasn't added a bio yet." },
    Bannerimage: {
      id: { type: String, default: "default-banner-id" },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dwd9h8qgy/image/upload/v1736013572/banner_g6qgev.png",
      },
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

export const User = models.User || model<IUser>("User", userSchema);
