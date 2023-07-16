import { type DataSource } from 'typeorm';
import { type SeederFactoryManager, type Seeder } from 'typeorm-extension';
import { CoinEntity } from '../entities';
import { coinList } from '../../../util/seeds';

export default class CoinSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(CoinEntity);
    await repository.insert(coinList);
  }
}
