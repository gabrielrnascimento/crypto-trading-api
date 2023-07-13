import { type Wallet } from './wallet';

export type User = {
  id: number
  email: string
  wallets?: Wallet[]
};
