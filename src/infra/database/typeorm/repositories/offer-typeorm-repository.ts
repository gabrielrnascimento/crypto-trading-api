import { type DataSource } from 'typeorm';
import { type InputAddOfferDTO } from '../../../../data/dtos';
import { type AddOfferRepository } from '../../../../data/protocols';
import { CoinOnWalletEntity, OfferEntity } from '../entities';

export class OfferTypeORMRepository implements AddOfferRepository {
  private readonly dataSource: DataSource;

  constructor (dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async add (data: InputAddOfferDTO): Promise<boolean> {
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
}
