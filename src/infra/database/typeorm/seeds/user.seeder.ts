import { type DataSource } from 'typeorm';
import { type Seeder, type SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../entities';
import { userList } from '../../../util/seeds';

export default class UserSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(UserEntity);
    await repository.insert(userList);
  }
}
