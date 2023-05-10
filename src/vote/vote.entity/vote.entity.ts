import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { UserEntity } from '../../user/user.entity/user.entity';

@Entity()
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  voteValue: number;

  @ManyToOne(() => UserEntity, (user) => user.votes)
  user: UserEntity;

  @ManyToOne(() => ServerEntity, (server) => server.votes, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
