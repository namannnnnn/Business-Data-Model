/* eslint-disable */


import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PdmTables } from '../Entities/pdmTables.entity'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'BDM',
        entities: [ 'dist/**/*.entity{.ts,.js}'],
        migrations: [],

      });
      return dataSource.initialize();

    },
  },
];

export const databaseSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'BDM',
        entities: [ 'dist/**/*.entity{.ts,.js}']
})

export const PhysicalDataModel: TypeOrmModuleOptions= {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'PDM',
  entities: [PdmTables]
}

npx postgres-schema-ts postgresql//postgres:1234@127.0.0.1:5432/PDM?currentSchema=public 555a37ce-6698-4835-adc3-247c72bf53ddPDM src/iterfaces/columns.interface.ts
schemats generate -c postgresql://localhost:5432/PDM?user=postgres&password=1234 -t 555a37ce-6698-4835-adc3-247c72bf53ddPDM -o src/iterfaces/columns.interface.ts