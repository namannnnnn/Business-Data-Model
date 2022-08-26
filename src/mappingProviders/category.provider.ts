/* eslint-disable */

import { DataSource } from 'typeorm';
import { Attribute } from '../Entities/attribute.entity';
import { Category } from 'src/Entities/category.entity';

export const mappingProviders = [
    { 
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
        inject: ['DATA_SOURCE']
    }
];