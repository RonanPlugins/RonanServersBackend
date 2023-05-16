import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ServerEntity } from '../../server/server.entity/server.entity';

@Entity()
export class ServerVerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique verification ID.' })
  id: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Whether the server is verified or not.' })
  isVerified: boolean;

  @Column({ nullable: true })
  @ApiProperty({ description: 'The server ID of the server verification' })
  serverId: number;

  @ManyToOne(() => ServerEntity, (server) => server.verifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'serverId' })
  @ApiProperty({
    description: 'The server that this verification belongs to.',
    required: true,
    type: () => ServerEntity, // use a lazy resolver here
  })
  server: ServerEntity;
}
