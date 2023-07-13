import { type Coin } from './coin';
import { type User } from './user';

export type Wallet = {
  id: number
  name: string
  owner: User
  coins: Coin[]
};
