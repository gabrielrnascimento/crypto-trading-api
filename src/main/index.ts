import { AppDataSource, DatabaseHelper } from '../infra/database/typeorm/config/data-source';
import { CoinEntity } from '../infra/database/typeorm/entities';

const main = async (): Promise<void> => {
  const databaseHelper = new DatabaseHelper();
  await databaseHelper.init();
  const coinRepository = AppDataSource.getRepository(CoinEntity);
  const coins = await coinRepository.find();
  console.log({ coins });
};

main()
  .then(() => {})
  .catch((err) => { console.error(err); });
