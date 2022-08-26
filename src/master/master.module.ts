/* eslint-disable */

import { Module } from '@nestjs/common';
import { masterProviders } from './master.provider'
import { DatabaseModule } from '../database/database.module'
import { MasterService } from './master.service'
import { MasterController } from './master.controller'

@Module({
    imports : [ DatabaseModule ],
    providers: [...masterProviders, MasterService],
    controllers: [ MasterController ],
    exports: [],
  })
export class MasterModule {}
