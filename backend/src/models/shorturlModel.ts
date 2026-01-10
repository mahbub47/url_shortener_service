import { InferSchemaType, model, Schema } from "mongoose";
import shortid from "shortid";

const shortUrlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true, default: shortid.generate() },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: Date.now() + 30*24*60*60*1000 },
  accessCount: { type: Number, default: 0 },
});

type ShortUrlType = InferSchemaType<typeof shortUrlSchema>;

export default model<ShortUrlType>("ShortUrl", shortUrlSchema);