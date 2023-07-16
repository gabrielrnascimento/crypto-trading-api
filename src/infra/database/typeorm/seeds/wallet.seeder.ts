import { type DataSource } from 'typeorm';
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension';
import { WalletEntity } from '../entities';
import { walletList } from '../../../util/seeds';

export default class WalletSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(WalletEntity);
    await repository.insert(walletList);
  }
}
