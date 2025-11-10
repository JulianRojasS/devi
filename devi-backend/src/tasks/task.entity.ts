import { Column, Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Stages } from 'src/stages/stages.entity';
import { User } from 'src/users/user.entity';

@Entity('tasks')
export class Task {
  @PrimaryColumn('char', { length: 36 })
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'char', length: 36 })
  stageId: string;
  @ManyToOne(() => Stages, (stage) => stage.id)
  @JoinColumn({ name: 'stageId' })
  stage: Stages;
  @Column({ type: 'char', length: 36 })
  creatorId: string;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'creatorId' })
  creator: User;
  @Column({ type: 'char', length: 36 })
  userId: string;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column({ type: 'enum', enum: ['completed', 'in_progress', 'pending'] })
  status: 'completed' | 'in_progress' | 'pending';
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;
  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;
}
