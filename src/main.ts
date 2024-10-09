import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './libs/config/config.service';
import { CustomSwaggerModule } from './swagger/swagger.module';
import { HttpExceptionFilter } from './exeption-filters/http-exeption-filter';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const configService = app.get<AppConfigService>(AppConfigService);

  const document = CustomSwaggerModule.createDocument(app);
  CustomSwaggerModule.setup(app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.port);

  const logger = new Logger('\x1b[37mDeveloper\x1b[33m');
  logger.log(
    `\x1b[35mApplication is running on:\x1b[34m ${await app.getUrl()}`,
  );
}
void bootstrap();
