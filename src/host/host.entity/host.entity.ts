import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class HostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
