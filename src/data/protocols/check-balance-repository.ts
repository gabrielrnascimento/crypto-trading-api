import { type Offer } from '../../domain/models';

export interface CheckBalanceRepository {
  validateBalance: (data: Offer) => Promise<boolean>
}
