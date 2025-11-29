import { Apps } from 'src/apps/apps.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity('stages')
export class Stages {
  @PrimaryColumn('char', { length: 36 })
  id: string;
  @Column({ length: 100 })
  name: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'char', length: 36 })
  appId: string;
  @ManyToOne(() => Apps, (app) => app.id)
  @JoinColumn({ name: 'appId' })
  app: Apps;
  /// user relationship
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
  /// status
  @Column({ type: 'enum', enum: ['active', 'inactive', 'pending'] })
  status: 'completed' | 'incomplete' | 'pending';
  @Column({ type: 'timestamp', nullable: true })
  expectedCompletionDate?: string;
  @Column({ type: 'timestamp', nullable: true })
  completionDate?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({ type: 'char', length: 36, nullable: true })
  currentTaskId?: string;
  @ManyToOne(() => Task, (task) => task.id)
  @JoinColumn({ name: 'currentTaskId', referencedColumnName: 'id' })
  currentTask?: Task;
  @OneToMany(() => Task, (task) => task.stage)
  tasks: Task[];
  @Column({ type: 'int', default: 0 })
  progress?: number;
}
