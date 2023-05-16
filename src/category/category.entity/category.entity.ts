import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ServerEntity } from '../../server/server.entity/server.entity';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ServerEntity, (server) => server.category)
  servers: ServerEntity[];
}
