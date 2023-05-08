import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { HostEntity } from '../../host/host.entity/host.entity';
import { ServerEntity } from '../../server/server.entity/server.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentText: string;

  @ManyToOne(() => HostEntity, (host) => host.comments)
  host: HostEntity;

  @ManyToOne(() => ServerEntity, (server) => server.comments, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
