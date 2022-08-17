import { model } from 'mongoose';
import { UserSchema } from './schemas';
import { IUser } from './interfaces';
import bcrypt from 'bcrypt';

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export default model<IUser>('User', UserSchema);
