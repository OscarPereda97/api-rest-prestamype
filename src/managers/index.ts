import { UserManager } from "./user.manager";
import { ExchangeManager } from './exchange.manager';

export const UserManagerFactory = UserManager.create();
export const ExchangeManagerFactory = ExchangeManager.create();