/* eslint-disable */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

async function bootstrap() {
  const URL = 'localhost:50051';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'bdm',
        protoPath: path.resolve(__dirname, '../src/protos/rpc.proto'),
      },
    },
  );
  await app.listen();
}

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.connectMicroservice<MicroserviceOptions>( {
//     transport: Transport.GRPC,
//     options: {
//       url: '0.0.0.0:50051',
//       package: 'bdm',
//       protoPath: path.resolve(__dirname, '../src/protos/rpc.proto'),
//     },
//   })

//   await app.startAllMicroservices();
//   await app.listen(3002);
// }
bootstrap();

