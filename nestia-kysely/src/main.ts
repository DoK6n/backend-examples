import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config';
import { Logger } from '@nestjs/common';
import { IpAddress } from './common/utils/ip-address';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);

  await app.listen(PORT);
  Logger.log(
    `

              🚀 Server ready at: ${IpAddress.current}:${PORT}
              📗 URL for OpenAPI: ${process.env.HOST_URL}:${PORT}/api-docs
              🌐 URL for HOST : ${process.env.HOST_URL}
    `,
    'NestBootstrap',
  );
}
bootstrap();
