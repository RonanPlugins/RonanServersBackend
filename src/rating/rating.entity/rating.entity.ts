import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { HostEntity } from '../../host/host.entity/host.entity';

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratingScore: number;

  @Column({ nullable: true })
  reviewText: string;

  @ManyToOne(() => HostEntity, (host) => host.ratings)
  host: HostEntity;

  @ManyToOne(() => ServerEntity, (server) => server.ratings, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
