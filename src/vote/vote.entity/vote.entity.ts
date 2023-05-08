import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HostEntity } from '../../host/host.entity/host.entity';
import { ServerEntity } from '../../server/server.entity/server.entity';

@Entity()
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voteValue: number;

  @ManyToOne(() => HostEntity, (host) => host.votes)
  host: HostEntity;

  @ManyToOne(() => ServerEntity, (server) => server.votes, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
