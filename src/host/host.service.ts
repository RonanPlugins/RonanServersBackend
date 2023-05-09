import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HostEntity } from './host.entity/host.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(HostEntity)
    private hostRepository: Repository<HostEntity>,
  ) {}
  async checkIfEntityExists(column: keyof HostEntity, value: any) {
    if (await this.hostRepository.findOne({ where: { [column]: value } })) {
      throw new ConflictException(`${column} already exists`);
    }
  }

  async createHost(
    username: string,
    email: string,
    password: string,
  ): Promise<HostEntity> {
    await this.checkIfEntityExists('username', username);
    await this.checkIfEntityExists('email', email);
    password = await bcrypt.hash(password, 10);
    const host = new HostEntity();
    host.username = username;
    host.password = password;
    host.email = email;
    return await this.hostRepository.save(host);
  }
  async findOneByUsername(username: string): Promise<HostEntity> {
    return await this.hostRepository.findOne({ where: { username } });
  }
  async findOneById(id: number): Promise<HostEntity> {
    return await this.hostRepository.findOne({ where: { id } });
  }
}
