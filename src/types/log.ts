import { Document } from 'mongoose';

export interface Log extends Document{
    user_email:string;
    ip:string;
    pays:string;
    agent:string;
  }