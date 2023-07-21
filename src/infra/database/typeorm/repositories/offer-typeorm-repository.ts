import { type DataSource } from 'typeorm';
import { type CheckOfferCreationDailyLimitRepository, type AddOfferRepository, type CheckBalanceRepository } from '../../../../data/protocols';
import { CoinOnWalletEntity, OfferEntity } from '../entities';
import { type InputCheckOfferCreationDailyLimitRepositoryDTO, type InputAddOfferRepositoryDTO, type InputCheckBalanceRepositoryDTO } from '../../../../data/dtos';
import { OFFER_DAILY_LIMIT } from '../../../../domain/utils/constants/offer-daily-limit';

export class OfferTypeORMRepository implements AddOfferRepository, CheckOfferCreationDailyLimitRepository, CheckBalanceRepository {
  private readonly dataSource: DataSource;

  constructor (dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async add (data: InputAddOfferRepositoryDTO): Promise<boolean> {
    const offer = new OfferEntity();

    const coinOnWallet = await this.dataSource.getRepository(CoinOnWalletEntity)
      .findOne({
        where: {
          coin: { id: data.coin.id },
          wallet: { id: data.wallet.id }
        }
      });

    if (!coinOnWallet) {
      return false;
    }

    offer.coinOnWallet = coinOnWallet;
    offer.quantity = data.quantity;

    const offerRepository = this.dataSource.getRepository(OfferEntity);
    const response = await offerRepository.save(offer);
    return Boolean(response);
  }

  async validateLimit (data: InputCheckOfferCreationDailyLimitRepositoryDTO): Promise<boolean> {
    const offerRepository = this.dataSource.getRepository(OfferEntity);

    const offers = await offerRepository.find({
      where: {
        coinOnWallet: {
          wallet: {
            user: data
          }
        }
      }
    });

    return offers.length < OFFER_DAILY_LIMIT;
  }

  private async getAvailableCoins (data: InputCheckBalanceRepositoryDTO, coinsInWallet: number): Promise<number> {
    const offers = await this.dataSource.getRepository(OfferEntity).find({
      relations: {
        coinOnWallet: {
          coin: true,
          wallet: true
        }
      },
      where: {
        coinOnWallet: {
          coin: data.coin,
          wallet: data.wallet
        }
      }
    });

    const coinsInUse = offers.reduce(
      (sum, coin) => sum + coin.quantity, 0);

    return coinsInWallet - coinsInUse;
  }

  async validateBalance (data: InputCheckBalanceRepositoryDTO): Promise<boolean> {
    const coinOnWalletRepository = this.dataSource.getRepository(CoinOnWalletEntity);

    const coin = await coinOnWalletRepository.findOne({
      where: {
        wallet: data.wallet,
        coin: data.coin
      }
    });

    if (!coin) return false;

    const availableCoins = await this.getAvailableCoins(data, coin.quantity);

    if (availableCoins > 0) return availableCoins >= data.quantity;

    return false;
  }
}
