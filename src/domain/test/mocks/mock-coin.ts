import { coinList } from '../../../infra/util/seeds';
import { type Coin } from '../../models';

const [{ id, code, price }] = coinList;

export const makeCoinMock = (): Coin => ({
  id,
  code,
  price
});
