import {Schema} from 'mongoose';

export const UserSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
})
