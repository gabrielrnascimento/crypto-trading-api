import { type Offer } from '../../domain/models';

export interface CheckOfferCreationDailyLimitRepository {
  validateLimit: (offerData: Offer) => Promise<boolean>
}
