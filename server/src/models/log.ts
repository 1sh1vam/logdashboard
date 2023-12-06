import mongoose, { Schema, Document } from 'mongoose';

export interface Log extends Document {
  userId: string;
  createdAt: Date;
  status: 'success' | 'failed';
  errorMsg?: string;
  request: object;
  response: object;
}

const LogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failed'], required: true },
  errorMsg: { type: String },
  request: { type: Object, required: true },
  response: { type: Object, required: true }
});

// Define indexes
LogSchema.index({ createdAt: -1 });

export const LogModel = mongoose.model<Log>('Log', LogSchema);
