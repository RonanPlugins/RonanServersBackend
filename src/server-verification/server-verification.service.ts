import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerVerificationEntity } from './server-verification.entity/server-verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServerVerificationService {
  constructor(
    @InjectRepository(ServerVerificationEntity)
    private serverVerificationEntityRepository: Repository<ServerVerificationEntity>,
  ) {}

  async create(serverId: number): Promise<ServerVerificationEntity> {
    const verification = this.serverVerificationEntityRepository.create({
      serverId,
    });
    return await this.serverVerificationEntityRepository.save(verification);
  }

  async findOne(id: string): Promise<ServerVerificationEntity> {
    return await this.serverVerificationEntityRepository.findOne({
      where: { id },
    });
  }

  async verify(id: string): Promise<ServerVerificationEntity> {
    const verification = await this.findOne(id);
    if (!verification) {
      throw new Error('Verification not found');
    }
    verification.isVerified = true;
    return await this.serverVerificationEntityRepository.save(verification);
  }
}
