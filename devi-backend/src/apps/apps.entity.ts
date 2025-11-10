import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('apps')
export class Apps {
  // char(36) primary key
  @PrimaryColumn('char', { length: 36 })
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'text', nullable: true })
  logoUrl?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ type: 'text', nullable: true })
  websiteUrl?: string;
  @Column({ type: 'enum', enum: ['completed', 'incomplete', 'pending'] })
  status: 'completed' | 'incomplete' | 'pending';
  @Column({ type: 'text', nullable: true })
  githubUrl?: string;
  /// user relationship
  @Column({ type: 'char', length: 36 })
  userId: string;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
}
