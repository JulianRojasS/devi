import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  // char(36) primary key
  @PrimaryColumn('char', { length: 36 })
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ length: 100, unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ default: false })
  verified: boolean;
  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'banned'],
    default: 'inactive',
  })
  status: 'active' | 'inactive' | 'banned';
  @Column('simple-array')
  roles: string[];
  @Column({ type: 'text', nullable: true })
  token?: string | null;
  @Column({ type: 'text', nullable: true })
  profilePictureUrl?: string;
  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;
  @Column({ type: 'text', nullable: true })
  bio?: string;
  @Column({ type: 'text', nullable: true })
  location?: string;
  @Column({ type: 'text', nullable: true })
  website?: string;
  @Column({ type: 'text', nullable: true })
  githubUrl?: string;
  @Column({ type: 'text', nullable: true })
  linkedinUrl?: string;
  @Column({ type: 'text', nullable: true })
  githubToken?: string;
}
