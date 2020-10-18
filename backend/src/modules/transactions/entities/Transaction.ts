import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../../users/entities/User';

import Category from '../../categories/entities/Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column({
    type: 'numeric',
    transformer: {
      from(value: string): number {
        return parseFloat(value);
      },
      to(value: number): number {
        return value;
      },
    },
  })
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.transactions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
