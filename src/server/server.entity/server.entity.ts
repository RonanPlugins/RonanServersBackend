import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { HostEntity } from '../../host/host.entity/host.entity';
import { CategoryEntity } from '../../category/category.entity/category.entity';
import { CommentEntity } from '../../comment/comment.entity/comment.entity';
import { VoteEntity } from '../../vote/vote.entity/vote.entity';
import { RatingEntity } from '../../rating/rating.entity/rating.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ServerEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the server.' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the server.' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The description of the server.',
    required: false,
  })
  description: string;

  @Column()
  @ApiProperty({ description: 'The IP address of the server.' })
  ipAddress: string;

  @Column()
  @ApiProperty({ description: 'The port of the server.' })
  port: number;

  @Column()
  @ApiProperty({ description: 'The version of the server.' })
  version: string;

  @Column()
  @ApiProperty({ description: 'The game mode of the server.' })
  gameMode: string;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ description: 'The rules of the server.', required: false })
  rules: string[];

  @Column({ nullable: true })
  @ApiProperty({ description: 'The ID of the host who owns the server.' })
  hostId: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the category that the server belongs to.',
  })
  categoryId: number;

  @ManyToOne(() => HostEntity, (host) => host.servers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hostId' })
  @ApiProperty({
    description: 'The host that owns the server.',
    required: true,
    type: () => HostEntity, // use a lazy resolver here
  })
  host: HostEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.servers)
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({ description: 'The category that the server belongs to.' })
  category: CategoryEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.server)
  @ApiProperty({ description: 'The comments made on the server.' })
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  @ApiProperty({ description: 'The votes made on the server.' })
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  @ApiProperty({ description: 'The ratings made on the server.' })
  ratings: RatingEntity[];
}