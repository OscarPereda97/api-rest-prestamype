import { model } from 'mongoose';
import { ExchangeSchema } from './schemas';
import { IExchange } from './interfaces';

export default model<IExchange>('Exchange', ExchangeSchema);