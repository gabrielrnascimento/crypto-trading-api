import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Coin from './coin';
import Wallet from './wallet';

@Entity({ name: 'coins_on_wallets' })
@Unique('UQ_COIN_ON_WALLET', ['coin', 'wallet'])
class CoinOnWallet {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    quantity: number;

  @ManyToOne(() => Coin, (coin) => coin.coinsOnWallet, { nullable: false })
  @JoinColumn({ name: 'coin_id' })
    coin: Coin;

  @ManyToOne(() => Wallet, (wallet) => wallet.coinsOnWallet, { nullable: false })
  @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;
}

export default CoinOnWallet;
