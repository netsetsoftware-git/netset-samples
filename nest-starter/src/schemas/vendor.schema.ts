
import * as mongoose from 'mongoose';

export const VendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  riskLevel : String
},
  { timestamps: true } );
