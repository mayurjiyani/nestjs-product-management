import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLES } from '../enums';
import { EntityBase } from './base';
import { Products } from './product.entity';

@Entity('users', { schema: 'public' })
export class Users extends EntityBase {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('varchar', { length: 255, name: 'email', unique: true })
  email: string | null;

  @Column('text', { name: 'password', nullable: true })
  password: string | null;

  @Column('text', { name: 'role' })
  role: string | null;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  // @OneToMany(() => Products, (product) => product.user)
  // products: Products[];
}
