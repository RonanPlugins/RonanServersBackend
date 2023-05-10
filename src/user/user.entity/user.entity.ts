import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { CommentEntity } from '../../comment/comment.entity/comment.entity';
import { VoteEntity } from '../../vote/vote.entity/vote.entity';
import { RatingEntity } from '../../rating/rating.entity/rating.entity';

@Entity()
@Unique(['username', 'email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @ApiProperty({ description: 'The ID of the user.', required: false })
  id: number;

  @Column()
  @IsString()
  @ApiProperty({ description: 'The username of the user.', required: true })
  username: string;

  @Column()
  @IsStrongPassword()
  @ApiProperty({ description: 'The password of the user.', required: true })
  password: string;

  @Column()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user.', required: true })
  email: string;

  @CreateDateColumn()
  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'The creation date of the user.',
    required: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  @IsOptional()
  @IsDateString()
  @ApiProperty({ description: 'The update date of the user.', required: false })
  updatedAt: Date;

  @OneToMany(() => ServerEntity, (server) => server.user)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The servers owned by the user.',
    required: false,
    type: () => ServerEntity, // use a lazy resolver here
  })
  servers: ServerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The comments made by the user.',
    required: false,
  })
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.server)
  @IsOptional()
  @IsArray()
  @ApiProperty({ description: 'The votes made by the user.', required: false })
  votes: VoteEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.server)
  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'The ratings made by the user.',
    required: false,
  })
  ratings: RatingEntity[];
}
