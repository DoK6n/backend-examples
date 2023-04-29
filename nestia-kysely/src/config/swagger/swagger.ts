import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import path from 'path';

export const setupSwagger = (app: INestApplication) => {
  /**
   * nestia swagger.json 파일 읽어서 수정하는 버전.
   * tsconfig에서 include옵션에 swagger.json 추가하여 빌드시 포함
   * */
  const docs = require(path.join(__dirname, './swagger.json'));
  docs.servers = [
    { url: `${process.env.HOST_URL}:${process.env.PORT}/api/v1` },
  ];
  docs.info = { title: 'Nestia', version: '0.1.0' };
  SwaggerModule.setup('/api-docs', app, docs);

  // @nestjs/swagger 버전
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setContact('Dok6n', 'https://github.com/Dok6n', 'ehrbs2018@gmail.com')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs-deco', app, document);
};
