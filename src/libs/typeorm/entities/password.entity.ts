import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Password' })
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  token: string;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  expiresAt: string;

  @OneToOne(() => User, (user) => user.password)
  user: User;

  constructor(passwordHash: string) {
    this.password = passwordHash;
  }
}
