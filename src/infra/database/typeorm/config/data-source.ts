import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';
import { MainSeeder } from '../seeds';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'challenge',
  synchronize: true,
  logging: false,
  entities: ['src/infra/database/typeorm/entities/**/*.ts'],
  migrations: [],
  subscribers: [],

  seeds: [MainSeeder]
};

export const AppDataSource = new DataSource(options);

export class DatabaseHelper {
  private _connection: DataSource;

  private async startup (): Promise<void> {
    try {
      this._connection = AppDataSource;
      await this._connection.initialize();
    } catch (err) {
      console.error('Database error: ', err);
    }
  }

  public async init (): Promise<void> {
    await this.startup();
  }

  public async close (): Promise<void> {
    await this._connection.destroy();
  }
}
