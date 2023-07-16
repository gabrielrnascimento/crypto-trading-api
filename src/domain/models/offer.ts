import { type Coin } from './coin';
import { type Wallet } from './wallet';

export type Offer = {
  coin: Coin
  wallet: Wallet
  quantity: number
};
