import { Document } from 'mongoose';

export interface Link extends Document {

   user_email: string;
   old_link: string;
   shorted_link: string;

}