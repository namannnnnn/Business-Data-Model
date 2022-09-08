/* eslint-disable */

import { DataSource } from 'typeorm';
import { Attribute } from '../Entities/attribute.entity';
import { Product } from 'src/Entities/product.entity';

export const mappingProviders = [
    { 
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
        inject: ['DATA_SOURCE']
    }
];