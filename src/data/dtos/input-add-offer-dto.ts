import { type Wallet, type Coin } from '../../domain/models';

export type InputAddOfferDTO = {
  quantity: number
  wallet: Pick<Wallet, 'id'>
  coin: Pick<Coin, 'id'>
};
