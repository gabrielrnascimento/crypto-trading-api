import { type Wallet } from '../../models';
import { makeCoinMock } from './mock-coin';
import { makeUserMock } from './mock-user';

export const makeWalletMock = (): Wallet => ({
  id: 1,
  coins: [
    makeCoinMock()
  ],
  name: 'any_wallet',
  owner: makeUserMock()
});
