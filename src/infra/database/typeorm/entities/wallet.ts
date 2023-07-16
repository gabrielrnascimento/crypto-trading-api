import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import CoinOnWallet from './coin-on-wallets';
import User from './user';

@Entity({ name: 'wallets' })
@Unique('UQ_WALLETS', ['name', 'user'])
class Wallet {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    name: string;

  @ManyToOne(() => User, (user) => user.wallets, {
    cascade: true
  })
  @JoinColumn({ name: 'user_id' })
    user: User;

  @OneToMany(() => CoinOnWallet, (coinOnWallet) => coinOnWallet.wallet)
    coinsOnWallet: CoinOnWallet[];
}

export default Wallet;
