import { IsNumberString } from 'class-validator';

export class ServerVerificationDto {
  @IsNumberString()
  serverId: number;
}
