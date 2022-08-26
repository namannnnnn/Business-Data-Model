/* eslint-disable */

import { DataSource } from 'typeorm';
import { Attribute, ReferenceAttributes } from '../Entities/attribute.entity';
import { TextValidation, NumericValidation, DateValidation, TimeValidation , PasswordValidation, RangeValidation, SingleSelectionValidation, MultipleSelectionValidation, DropdownValidation, UrlValidation } from 'src/Entities/validation.entity';
import { Rule } from '../Entities/rules.entity';
import { ReferenceMaster } from 'src/Entities/master.entity'
import { CategoryAssignment } from 'src/Entities/categoryAssignment.entity';


export const attributeProviders = [
  {
    provide: 'ATTRIBUTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Attribute),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ATTRIBUTE_RULES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Rule),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TEXT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TextValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'NUMERIC_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(NumericValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DATE_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DateValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TIME_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TimeValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PASSWORD_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PasswordValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RANGE_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(RangeValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SINGLESELECT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SingleSelectionValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MULTISELECT_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(MultipleSelectionValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DROPDOWN_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(DropdownValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'URL_VALIDATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UrlValidation),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ATTRIBUTE_REFERENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReferenceAttributes),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MASTER_REFERENCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ReferenceMaster),
    inject: ['DATA_SOURCE'],
  },
  {
    provide : 'CATEGORY_ASSIGNMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CategoryAssignment),
    inject: ['DATA_SOURCE'],
  }
];