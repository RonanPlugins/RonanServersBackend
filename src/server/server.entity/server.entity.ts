import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn, OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/user.entity/user.entity';
import { CategoryEntity } from '../../category/category.entity/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  ServerVerificationEntity
} from '../../server-verification/server-verification.entity/server-verification.entity';

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
  @ApiProperty({ description: 'The ID of the user who owns the server.' })
  userId: number;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The ID of the category that the server belongs to.',
  })
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.servers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({
    description: 'The user that owns the server.',
    required: true,
    type: () => UserEntity, // use a lazy resolver here
  })
  user: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.servers)
  @JoinColumn({ name: 'categoryId' })
  @ApiProperty({ description: 'The category that the server belongs to.' })
  category: CategoryEntity;

  @OneToMany(
    () => ServerVerificationEntity,
    (verification) => verification.server,
  )
  @ApiProperty({
    description: 'The verifications for this server.',
    required: false,
    type: () => ServerVerificationEntity,
  })
  verifications: ServerVerificationEntity[];
}
