import { type Coin } from './coin';
import { type User } from './user';
import { type Wallet } from './wallet';

export type Offer = {
  createdBy: User
  coin: Coin
  wallet: Wallet
  quantity: number
  unitPrice: number
  totalPrice: number
};
