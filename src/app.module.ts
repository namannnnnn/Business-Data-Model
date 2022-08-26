/* eslint-disable */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/orm.config';
import { MasterModule } from './master/master.module';
import { AttributeModule } from './attribution/attribution.module'
import { PhysicalDataModel } from './database/database.provider'

@Module({
  imports: [
    MasterModule,
    AttributeModule,
    TypeOrmModule.forRoot({ ...PhysicalDataModel, name:'PDM' })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
