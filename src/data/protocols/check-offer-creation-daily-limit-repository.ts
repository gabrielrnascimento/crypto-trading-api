import { type InputAddOfferDTO } from '../dtos/input-add-offer-dto';

export interface CheckOfferCreationDailyLimitRepository {
  validateLimit: (offerData: InputAddOfferDTO) => Promise<boolean>
}
