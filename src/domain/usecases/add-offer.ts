import { type InputAddOfferDTO } from '../../data/dtos/input-add-offer-dto';
import { type OutputAddOfferDTO } from '../../data/dtos/output-add-offer-dto';

export interface AddOffer {
  add: (offer: InputAddOfferDTO) => Promise<OutputAddOfferDTO>
}
