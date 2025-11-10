import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('docker')
export class Docker {
  @PrimaryColumn('char', { length: 36 })
  id: string;
  @Column('varchar', { length: 100 })
  name: string;
  @Column('varchar', { length: 100 })
  host: string;
  @Column('int')
  port: number;
  @Column('boolean')
  active: boolean;
  @Column('char', { length: 36 })
  creatorId: string;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'creatorId' })
  creator?: User;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
