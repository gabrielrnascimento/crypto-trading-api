import { type InputAddOfferDTO } from '../dtos/';

export interface AddOfferRepository {
  add: (data: InputAddOfferDTO) => Promise<boolean>
}
