import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Transaction from '../../transactions/entities/Transaction';
import User from '../../users/entities/User';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column()
  background_color_light: string;

  @Column()
  background_color_dark: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Transaction, transaction => transaction.category)
  transactions: Transaction[];

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.categories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  transactionsCount?: number;
}

export default Category;
