import { type Offer } from '../../domain/models';

export interface CheckOfferCreationDailyLimitRepository {
  validate: (offerData: Offer) => Promise<boolean>
}
