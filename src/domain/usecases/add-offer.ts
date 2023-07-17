import { type InputAddOfferRepositoryDTO, type OutputAddOfferRepositoryDTO } from '../../data/dtos';

export interface AddOffer {
  add: (offer: InputAddOfferRepositoryDTO) => Promise<OutputAddOfferRepositoryDTO>
}
