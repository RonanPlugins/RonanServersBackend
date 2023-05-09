import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { HostEntity } from '../../host/host.entity/host.entity';
import { CategoryEntity } from '../../category/category.entity/category.entity';
import { CommentEntity } from '../../comment/comment.entity/comment.entity';
import { VoteEntity } from '../../vote/vote.entity/vote.entity';
import { RatingEntity } from '../../rating/rating.entity/rating.entity';
@Entity()
export class ServerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  ipAddress: string;

  @Column()
  port: number;

  @Column()
  version: string;

  @Column()
  gameMode: string;

  @Column()
  playerCapacity: number;

  @Column()
  onlinePlayers: number;

  @Column({ type: 'json', nullable: true })
  rules: string[];

  @Column({ nullable: true })
  hostId: number;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => HostEntity, (host) => host.servers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hostId' })
  host: HostEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.servers)
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.server)
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  ratings: RatingEntity[];
}
