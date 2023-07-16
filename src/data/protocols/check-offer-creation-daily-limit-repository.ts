import { type InputAddOfferDTO } from '../dtos/';

export interface CheckOfferCreationDailyLimitRepository {
  validateLimit: (offerData: InputAddOfferDTO) => Promise<boolean>
}
