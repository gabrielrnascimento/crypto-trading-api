import { type DataSource } from 'typeorm';
import { type SeederFactoryManager, type Seeder } from 'typeorm-extension';
import { OfferEntity } from '../entities';
import { offerList } from '../../../util/seeds';

export default class OfferSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(OfferEntity);
    await repository.insert(offerList);
  }
}
