import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type AddOfferRepository, type CheckOfferCreationDailyLimitRepository } from '../../protocols';

export class DbAddOffer {
  private readonly addOfferRepository: AddOfferRepository;
  private readonly checkOfferCreationDailyLimitRepository: CheckOfferCreationDailyLimitRepository;

  constructor (addOfferRepository: AddOfferRepository, checkOfferCreationDailyLimitRepository: CheckOfferCreationDailyLimitRepository) {
    this.addOfferRepository = addOfferRepository;
    this.checkOfferCreationDailyLimitRepository = checkOfferCreationDailyLimitRepository;
  }

  async add (data: AddOfferModel): Promise<boolean> {
    await this.checkOfferCreationDailyLimitRepository.validate(data);
    return await this.addOfferRepository.add(data);
  }
}
