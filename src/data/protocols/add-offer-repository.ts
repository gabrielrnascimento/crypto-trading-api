import { type InputAddOfferDTO } from '../dtos/input-add-offer-dto';

export interface AddOfferRepository {
  add: (data: InputAddOfferDTO) => Promise<boolean>
}
