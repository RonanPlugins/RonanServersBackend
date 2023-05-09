import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { CommentEntity } from '../../comment/comment.entity/comment.entity';
import { VoteEntity } from '../../vote/vote.entity/vote.entity';
import { RatingEntity } from '../../rating/rating.entity/rating.entity';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
@Entity()
@Unique(['username', 'email'])
export class HostEntity {
  @PrimaryGeneratedColumn()
  @IsOptional()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsStrongPassword()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @OneToMany(() => ServerEntity, (server) => server.host)
  @IsOptional()
  @IsArray()
  servers: ServerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.host)
  @IsOptional()
  @IsArray()
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  @IsOptional()
  @IsArray()
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  @IsOptional()
  @IsArray()
  ratings: RatingEntity[];
}
