import { type Coin } from '../../models';

export const makeCoinMock = (): Coin => ({
  id: 1,
  code: 'ANY',
  unitPrice: 3.50
});
