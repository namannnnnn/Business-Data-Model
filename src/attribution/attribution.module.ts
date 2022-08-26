/* eslint-disable */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { attributeProviders } from './attribution.provider'
import { attributeGroupProviders } from './attributeGroup.provider';
import { DatabaseModule } from '../database/database.module'
import { AttributeService } from './attribution.service'
import { AttributeController } from './attribution.controller'
import { ValidationService } from './validation.service';
import { mappingProviders } from 'src/mappingProviders/category.provider';
import { PdmTables } from '../Entities/pdmTables.entity'

@Module({
    imports : [ DatabaseModule, TypeOrmModule.forFeature([PdmTables], 'PDM') ],
    providers: [...attributeProviders,...mappingProviders ,...attributeGroupProviders, AttributeService, ValidationService],
    controllers: [ AttributeController ],
    exports: [],
  })
export class AttributeModule {}