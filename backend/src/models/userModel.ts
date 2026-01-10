import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  totalShortenedUrls: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

type UserType = InferSchemaType<typeof userSchema>;

export default model<UserType>("User", userSchema);