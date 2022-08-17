import mongoose from 'mongoose';
import {
    mongooseConnection
} from '../config/database';

mongoose.connect(mongooseConnection.uri);

export const connection = mongoose.connection;