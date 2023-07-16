import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import Wallet from './wallet';

@Entity({ name: 'users' })
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    email: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user)
    wallets: Wallet[];
}

export default User;
