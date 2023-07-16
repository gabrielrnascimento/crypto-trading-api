import { type OutputAddOfferRepositoryDTO, type InputAddOfferRepositoryDTO, type InputCheckOfferCreationDailyLimitRepositoryDTO, type InputCheckBalanceRepositoryDTO } from '../../dtos';
import { type AddOfferRepository, type CheckOfferCreationDailyLimitRepository, type CheckBalanceRepository } from '../../protocols';

export class AddOfferRepositorySpy implements AddOfferRepository {
  params: InputAddOfferRepositoryDTO;
  result = true;

  async add (data: InputAddOfferRepositoryDTO): Promise<OutputAddOfferRepositoryDTO> {
    this.params = data;
    return this.result;
  }
}

export class CheckOfferCreationDailyLimitRepositorySpy implements CheckOfferCreationDailyLimitRepository {
  params: InputCheckOfferCreationDailyLimitRepositoryDTO;
  result = true;

  async validateLimit (data: InputCheckOfferCreationDailyLimitRepositoryDTO): Promise<boolean> {
    this.params = data;
    return this.result;
  }
}

export class CheckBalanceRepositorySpy implements CheckBalanceRepository {
  params: InputCheckBalanceRepositoryDTO;
  result = true;

  async validateBalance (data: InputCheckBalanceRepositoryDTO): Promise<boolean> {
    this.params = data;
    return this.result;
  }
}
