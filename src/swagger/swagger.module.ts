import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: () => ({
        swagger: {
          title: 'Notepad API',
          version: '1.0',
          description: 'API documentation',
        },
      }),
    },
  ],
})
export class CustomSwaggerModule {
  static setup(app, document) {
    SwaggerModule.setup('swagger', app, document);
  }

  static createDocument(app) {
    const config = app.get('APP_CONFIG');
    const options = new DocumentBuilder()
      .setTitle(config.swagger.title)
      .setDescription(config.swagger.description)
      .setVersion(config.swagger.version)
      .build();
    return SwaggerModule.createDocument(app, options);
  }
}
