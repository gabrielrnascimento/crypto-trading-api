import { type InputAddOfferDTO } from '../dtos/input-add-offer-dto';

export interface CheckBalanceRepository {
  validateBalance: (data: InputAddOfferDTO) => Promise<boolean>
}
