import { type InputAddOfferDTO } from '../dtos/';

export interface CheckBalanceRepository {
  validateBalance: (data: InputAddOfferDTO) => Promise<boolean>
}
