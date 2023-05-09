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
import { ApiProperty } from '@nestjs/swagger';
@Entity()
@Unique(['username', 'email'])
export class HostEntity {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @ApiProperty({ description: 'The ID of the host.', required: false })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'The username of the host.', required: true })
  username: string;

  @Column()
  @IsStrongPassword()
  @ApiProperty({ description: 'The password of the host.', required: true })
  password: string;

  @Column()
  @IsEmail()
  @ApiProperty({ description: 'The email of the host.', required: true })
  email: string;

  @CreateDateColumn()
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The creation date of the host.',
    required: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'The update date of the host.', required: false })
  updatedAt: Date;

  @OneToMany(() => ServerEntity, (server) => server.host)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The servers owned by the host.',
    required: false,
    type: () => ServerEntity, // use a lazy resolver here
  })
  servers: ServerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.host)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The comments made by the host.',
    required: false,
  })
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'The votes made by the host.', required: false })
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The ratings made by the host.',
    required: false,
  })
  ratings: RatingEntity[];
}
