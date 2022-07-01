import * as mongoose from 'mongoose';

export const LogSchema=new mongoose.Schema({
    user_email:{type:String},
    link:{type:String},
    ip:{type:String},
    pays:{type:String},
    agent:{type:String},
    time:{type:Date ,default: Date.now()},

})