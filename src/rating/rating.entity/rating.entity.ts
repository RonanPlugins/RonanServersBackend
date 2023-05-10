import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';
import { UserEntity } from '../../user/user.entity/user.entity';

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ratingScore: number;

  @Column({ nullable: true })
  reviewText: string;

  @ManyToOne(() => UserEntity, (user) => user.ratings)
  user: UserEntity;

  @ManyToOne(() => ServerEntity, (server) => server.ratings, {
    onDelete: 'CASCADE',
  })
  server: ServerEntity;
}
