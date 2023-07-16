import { type DataSource } from 'typeorm';
import { type SeederFactoryManager, type Seeder, runSeeder } from 'typeorm-extension';
import CoinSeeder from './coin.seeder';
import UserSeeder from './user.seeder';
import WalletSeeder from './wallet.seeder';
import CoinOnWalletSeeder from './coin-on-wallet.seeder';

export default class MainSeeder implements Seeder {
  public async run (dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await runSeeder(dataSource, CoinSeeder);
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, WalletSeeder);
    await runSeeder(dataSource, CoinOnWalletSeeder);
  }
}
