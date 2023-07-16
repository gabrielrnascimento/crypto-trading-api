import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import CoinOnWallet from './coin-on-wallets';

@Entity({ name: 'offers' })
class Offer {
  @PrimaryGeneratedColumn()
    id: number;

  @OneToOne(() => CoinOnWallet, { nullable: false })
  @JoinColumn({ name: 'coin_on_wallet_id' })
    coinOnWallet: CoinOnWallet;

  @Column('double precision')
    quantity: number;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date;
}

export default Offer;
