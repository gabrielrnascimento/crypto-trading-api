import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type CheckBalanceRepository, type AddOfferRepository, type CheckOfferCreationDailyLimitRepository } from '../../protocols';

export class DbAddOffer {
  private readonly addOfferRepository: AddOfferRepository;
  private readonly checkOfferCreationDailyLimitRepository: CheckOfferCreationDailyLimitRepository;
  private readonly checkBalanceRepository: CheckBalanceRepository;

  constructor (
    addOfferRepository: AddOfferRepository,
    checkOfferCreationDailyLimitRepository: CheckOfferCreationDailyLimitRepository,
    checkBalanceRepository: CheckBalanceRepository
  ) {
    this.addOfferRepository = addOfferRepository;
    this.checkOfferCreationDailyLimitRepository = checkOfferCreationDailyLimitRepository;
    this.checkBalanceRepository = checkBalanceRepository;
  }

  async add (data: AddOfferModel): Promise<boolean> {
    const isValidBalance = await this.checkBalanceRepository.validate(data);
    const isValidLimit = await this.checkOfferCreationDailyLimitRepository.validate(data);
    if (isValidBalance && isValidLimit) {
      return await this.addOfferRepository.add(data);
    }
    return false;
  }
}
