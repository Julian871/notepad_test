import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  constructor(name: string) {
    this.name = name;
  }
}
