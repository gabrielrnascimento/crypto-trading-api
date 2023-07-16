import { type AddOffer } from '../../../domain/usecases/add-offer';
import { type InputAddOfferDTO } from '../../dtos/';
import { type CheckBalanceRepository, type AddOfferRepository, type CheckOfferCreationDailyLimitRepository } from '../../protocols';

export class DbAddOffer implements AddOffer {
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

  async add (data: InputAddOfferDTO): Promise<boolean> {
    const isValidBalance = await this.checkBalanceRepository.validateBalance(data);
    const isValidLimit = await this.checkOfferCreationDailyLimitRepository.validateLimit(data);
    if (isValidBalance && isValidLimit) {
      return await this.addOfferRepository.add(data);
    }
    return false;
  }
}
