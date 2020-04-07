import * as mongoose from 'mongoose';

export const SuggestionSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  description: String,
});
