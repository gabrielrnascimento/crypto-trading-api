import { type Offer } from '../../models';
import { makeCoinMock } from './mock-coin';
import { makeUserMock } from './mock-user';
import { makeWalletMock } from './mock-wallet';

export const mockOffer = (): Offer => ({
  coin: makeCoinMock(),
  createdBy: makeUserMock(),
  wallet: makeWalletMock(),
  quantity: 10,
  unitPrice: 3.50,
  totalPrice: 35.0
});
