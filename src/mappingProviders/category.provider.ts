/* eslint-disable */

import { DataSource } from 'typeorm';
import { Attribute } from '../Entities/attribute.entity';
import { Category } from 'src/Entities/category.entity';
import { Product } from 'src/Entities/product.entity';
import { ProductCombo } from 'src/Entities/productCombo.entity';
import { ProductComboAssignment } from 'src/Entities/productComboAssignment.entity';
import { ProductGroupAssignment } from 'src/Entities/productGroupAssignment.entity';
import { CategoryGroupAssignment } from 'src/Entities/categoryGroupAssignment.entity';

export const mappingProviders = [
    { 
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
        inject: ['DATA_SOURCE']
    },
    { 
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
        inject: ['DATA_SOURCE']
    },
    { 
        provide :'PRODUCT_COMBO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductCombo),
        inject : [ 'DATA_SOURCE']
    },
    { 
        provide :'PRODUCT_COMBO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductCombo),
        inject : [ 'DATA_SOURCE']
    }, 

    { 
        provide :'PRODUCT_GROUP_ASSIGNMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductGroupAssignment),
        inject : [ 'DATA_SOURCE']
    },

    { 
        provide :'CATEGORY_GROUP_ASSIGNMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoryGroupAssignment),
        inject : [ 'DATA_SOURCE']
    },
];