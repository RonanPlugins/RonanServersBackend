import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { UserEntity } from '../../user/user.entity/user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  commentText: string;

  @ManyToOne(() => UserEntity, (user ) => user.comments)
  user: UserEntity;

  @ManyToOne(() => ServerEntity, (server) => server.comments, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
