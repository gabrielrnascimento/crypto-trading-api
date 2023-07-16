import { type DataSource } from 'typeorm';
import { type SeederFactoryManager, type Seeder } from 'typeorm-extension';
import { CoinOnWalletEntity } from '../entities';
import { coinOnWalletList } from '../../../util/seeds';

export default class CoinOnWalletSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(CoinOnWalletEntity);
    await repository.insert(coinOnWalletList);
  }
}
