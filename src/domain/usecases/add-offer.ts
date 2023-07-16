import { type OutputAddOfferDTO, type InputAddOfferDTO } from '../../data/dtos/';

export interface AddOffer {
  add: (offer: InputAddOfferDTO) => Promise<OutputAddOfferDTO>
}
