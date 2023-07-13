import { type AddOfferModel } from '../../domain/usecases/add-offer';

export interface AddOfferRepository {
  add: (data: AddOfferModel) => Promise<boolean>
}
