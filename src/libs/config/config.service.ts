import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from './env.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  get db_url(): string {
    return this.configService.get('DATABASE_URL');
  }
}
