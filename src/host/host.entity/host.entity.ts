import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { CommentEntity } from '../../comment/comment.entity/comment.entity';
import { VoteEntity } from '../../vote/vote.entity/vote.entity';
import { RatingEntity } from '../../rating/rating.entity/rating.entity';
@Entity()
export class HostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ServerEntity, (server) => server.host)
  servers: ServerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.host)
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  ratings: RatingEntity[];
}
