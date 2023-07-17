import { type InputAddOfferRepositoryDTO } from '../dtos';

export interface AddOfferRepository {
  add: (data: InputAddOfferRepositoryDTO) => Promise<boolean>
}
