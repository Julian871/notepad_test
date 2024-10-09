import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Email' })
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'boolean', default: false })
  isConfirmed: boolean;

  @Column({ type: 'timestamp with time zone' })
  expiresAt: Date;

  @OneToOne(() => User, (user) => user.email)
  user: User;

  constructor(address: string, code: string, expiresAt: Date) {
    this.address = address;
    this.code = code;
    this.expiresAt = expiresAt;
  }
}
