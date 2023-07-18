import { type Wallet, type Coin } from '../../domain/models';
import type User from '../../infra/database/typeorm/entities/user';

export type InputDbAddOfferDto = {
  quantity: number
  wallet: Pick<Wallet, 'id'>
  coin: Pick<Coin, 'id'>
};

export type InputAddOfferDTO = InputDbAddOfferDto;

export type InputAddOfferRepositoryDTO = InputDbAddOfferDto;

export type OutputAddOfferRepositoryDTO = boolean;

export type InputCheckOfferCreationDailyLimitRepositoryDTO = Pick<User, 'id'>;

export type InputCheckBalanceRepositoryDTO = InputDbAddOfferDto;
