import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Order } from '../../orders/models/order';
import { Product } from '../../products/models/product';

@Entity('items')
class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column('uuid')
  order_id: string;

  @ManyToOne(() => Order, order => order.item)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column('uuid')
  product_id: string;

  @OneToOne(() => Product, product => product.item)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Item };
