import { type InputCheckOfferCreationDailyLimitRepositoryDTO } from '../dtos';

export interface CheckOfferCreationDailyLimitRepository {
  validateLimit: (offerData: InputCheckOfferCreationDailyLimitRepositoryDTO) => Promise<boolean>
}
