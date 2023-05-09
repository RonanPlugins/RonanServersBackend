import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerEntity } from './server.entity/server.entity';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private serverRepository: Repository<ServerEntity>,
  ) {}

  async createServer(
    name: string,
    description: string,
    ipAddress: string,
    port: number,
    version: string,
    gameMode: string,
    playerCapacity: number,
    onlinePlayers: number,
    rules: string[],
    hostId: number,
    categoryId: number,
  ): Promise<ServerEntity> {
    const server = new ServerEntity();
    server.name = name;
    server.description = description;
    server.ipAddress = ipAddress;
    server.port = port;
    server.version = version;
    server.gameMode = gameMode;
    server.playerCapacity = playerCapacity;
    server.onlinePlayers = onlinePlayers;
    server.rules = rules;
    server.hostId = hostId;
    server.categoryId = categoryId;
    return await this.serverRepository.save(server);
  }

  async findAllByHostId(hostId: number): Promise<ServerEntity[]> {
    return await this.serverRepository.find({ where: { hostId } });
  }
}
