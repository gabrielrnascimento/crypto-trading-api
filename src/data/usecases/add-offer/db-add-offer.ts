import { type AddOffer } from '../../../domain/usecases/add-offer';
import { type InputDbAddOfferDto } from '../../dtos';
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

  async add (data: InputDbAddOfferDto): Promise<boolean> {
    const isValidBalance = await this.checkBalanceRepository.validateBalance(data);
    const isValidLimit = await this.checkOfferCreationDailyLimitRepository.validateLimit(data.wallet);
    if (isValidBalance && isValidLimit) {
      return await this.addOfferRepository.add(data);
    }
    return false;
  }
}
