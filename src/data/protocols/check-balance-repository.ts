import { type InputCheckBalanceRepositoryDTO } from '../dtos';

export interface CheckBalanceRepository {
  validateBalance: (data: InputCheckBalanceRepositoryDTO) => Promise<boolean>
}
