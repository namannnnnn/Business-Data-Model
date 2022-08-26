/* eslint-disable */

import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const config : TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'BDM',
    entities: [ 'dist/**/*.entity{.ts,.js}'],
    synchronize:true
}

