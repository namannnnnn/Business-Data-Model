/* eslint-disable */

import { DataSource } from 'typeorm';
import { AttributeGroup } from '../Entities/attributeGroup.entity';


export const attributeGroupProviders = [
  {
    provide: 'ATTRIBUTEGROUP_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AttributeGroup),
    inject: ['DATA_SOURCE'],
  },
];