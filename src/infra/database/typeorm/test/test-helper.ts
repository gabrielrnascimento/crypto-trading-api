import { DataSource, type DataSourceOptions } from 'typeorm';
import { runSeeders, type SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../seeds';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'challenge_test',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ['src/infra/database/typeorm/entities/**/*.ts'],
  migrations: [],
  subscribers: [],

  seeds: [MainSeeder]
};

export const TestDataSource = new DataSource(options);

export class DatabaseTestHelper {
  private _connection: DataSource;

  private async startup (): Promise<void> {
    try {
      this._connection = TestDataSource;
      await this._connection.initialize();

      await runSeeders(this._connection);
    } catch (err) {
      console.error('Testing error: ', err);
    }
  }

  public async init (): Promise<void> {
    await this.startup();
  }

  public async close (): Promise<void> {
    await this._connection.destroy();
  }
}
