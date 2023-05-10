import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServerEntity } from './server.entity/server.entity';
import * as util from 'minecraft-server-util';
import { JavaStatusResponse } from 'minecraft-server-util';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(ServerEntity)
    private serverRepository: Repository<ServerEntity>,
  ) {}

  async checkIfEntityExists(column: keyof ServerEntity, value: any) {
    if (
      !(await this.serverRepository.findOne({ where: { [column]: value } }))
    ) {
      throw new NotFoundError(`${column} does not exist`);
    }
  }

  async createServer(
    name: string,
    description: string,
    ipAddress: string,
    port: number,
    version: string,
    gameMode: string,
    rules: string[],
    userId: number,
    categoryId: number,
  ): Promise<ServerEntity> {
    const server = new ServerEntity();
    server.name = name;
    server.description = description;
    server.ipAddress = ipAddress;
    server.port = port;
    server.version = version;
    server.gameMode = gameMode;
    server.rules = rules;
    server.userId = userId;
    server.categoryId = categoryId;
    return await this.serverRepository.save(server);
  }

  async findAllByUserId(userId: number): Promise<ServerEntity[]> {
    return await this.serverRepository.find({ where: { userId } });
  }

  async findAllByCategoryId(categoryId: number): Promise<ServerEntity[]> {
    return await this.serverRepository.find({ where: { categoryId } });
  }

  async findOneById(id: number): Promise<ServerEntity> {
    return await this.serverRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ServerEntity[]> {
    return await this.serverRepository.find();
  }
  async getOnlinePlayers(serverId: number): Promise<number> {
    const server = await this.findOneById(serverId);
    try {
      const res = await util.status(server.ipAddress, server.port);
      return res.players.online;
    } catch (err) {
      console.error(err);
    }
  }

  async getServerStatus(serverId: number): Promise<JavaStatusResponse> {
    const server = await this.findOneById(serverId);
    try {
      return await util.status(server.ipAddress, server.port);
    } catch (err) {
      console.error(err);
    }
  }
  async deleteServer(id: number): Promise<void> {
    await this.serverRepository.delete(id);
  }
  async updateServer(
    id: number,
    data: Partial<ServerEntity>,
  ): Promise<ServerEntity> {
    await this.serverRepository.update(id, data);
    return await this.findOneById(id);
  }
}
