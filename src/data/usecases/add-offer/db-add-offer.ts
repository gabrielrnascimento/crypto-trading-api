import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type AddOfferRepository } from '../../protocols/add-offer-repository';

export class DbAddOffer {
  private readonly addOfferRepository: AddOfferRepository;

  constructor (addOfferRepository: AddOfferRepository) {
    this.addOfferRepository = addOfferRepository;
  }

  async add (data: AddOfferModel): Promise<void> {
    await this.addOfferRepository.add(data);
  }
}
