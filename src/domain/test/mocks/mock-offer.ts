import { type Offer } from '../../models';
import { makeCoinMock } from './mock-coin';
import { makeWalletMock } from './mock-wallet';

export const mockOffer = (): Offer => ({
  coin: makeCoinMock(),
  wallet: makeWalletMock(),
  quantity: 10
});
