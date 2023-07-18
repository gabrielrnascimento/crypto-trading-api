import { type InputAddOfferDTO } from '../../../data/dtos';
import { type AddOffer } from '../../../domain/usecases/add-offer';

export class AddOfferStub implements AddOffer {
  async add (offer: InputAddOfferDTO): Promise<boolean> {
    return true;
  }
}
