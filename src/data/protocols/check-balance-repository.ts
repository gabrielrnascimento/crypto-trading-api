import { type Offer } from '../../domain/models';

export interface CheckBalanceRepository {
  validate: (data: Offer) => Promise<boolean>
}
