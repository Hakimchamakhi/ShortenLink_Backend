import * as mongoose from 'mongoose';

export const LinkSchema=new mongoose.Schema({
    user_email:{type:String},
    old_link:{type:String},
    shorted_link:{type:String},

})