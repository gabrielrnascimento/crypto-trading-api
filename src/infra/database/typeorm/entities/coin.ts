import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CoinOnWallet from './coin-on-wallets';

@Entity({ name: 'coins' })
class Coin {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    code: string;

  @Column('double precision')
    price: number;

  @OneToMany(() => CoinOnWallet, (coinOnWallet) => coinOnWallet.coin)
    coinsOnWallet: CoinOnWallet[];
}

export default Coin;
