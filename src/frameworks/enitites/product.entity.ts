import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EntityBase } from './base';
import { Users } from './user.entity';

@Entity('products', { schema: 'public' })
export class Products extends EntityBase {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('decimal', { name: 'price', precision: 10, scale: 2 })
  price: number;

  @Column('boolean', { name: 'is_visible', default: false })
  isVisible: boolean;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @Column({
    type: 'bigint',
    name: 'user_id',
  })
  userId: number;

  // @ManyToOne(() => Users, (user) => user.products, { nullable: false })
  // user: Users;
}
