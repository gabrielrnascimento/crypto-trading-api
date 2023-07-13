import { type Offer } from '../../../domain/models';
import { type AddOfferModel } from '../../../domain/usecases/add-offer';
import { type AddOfferRepository, type CheckOfferCreationDailyLimitRepository, type CheckBalanceRepository } from '../../protocols';

export class AddOfferRepositorySpy implements AddOfferRepository {
  params: AddOfferModel;
  result = true;

  async add (data: AddOfferModel): Promise<boolean> {
    this.params = data;
    return this.result;
  }
}

export class CheckOfferCreationDailyLimitRepositorySpy implements CheckOfferCreationDailyLimitRepository {
  params: Offer;
  result = true;

  async validate (offerData: Offer): Promise<boolean> {
    this.params = offerData;
    return this.result;
  }
}

export class CheckBalanceRepositorySpy implements CheckBalanceRepository {
  params: Offer;
  result = true;

  async validate (data: Offer): Promise<boolean> {
    this.params = data;
    return this.result;
  }
}
