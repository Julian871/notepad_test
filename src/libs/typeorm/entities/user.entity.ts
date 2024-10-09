import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Email } from './email.entity';
import { Password } from './password.entity';
import { Profile } from './profile.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @OneToOne(() => Email, (email) => email.user, { cascade: true })
  @JoinColumn()
  email: Email;

  @OneToOne(() => Password, (password) => password.user, { cascade: true })
  @JoinColumn()
  password: Password;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: Profile;

  constructor(email: Email, password: Password, profile: Profile) {
    this.email = email;
    this.password = password;
    this.profile = profile;
  }
}
