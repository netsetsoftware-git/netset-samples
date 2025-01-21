
import { Document } from 'mongoose';

export interface Vendor extends Document {
  readonly name: string;
  readonly email:string
  readonly contact:string
  readonly risklevel : string
}