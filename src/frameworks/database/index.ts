import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
} from '../environment';
import { Users } from '../enitites/user.entity';
import { Products } from '../enitites/product.entity';

const connectConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [Users, Products],
  autoLoadEntities: true,
  synchronize: true,
};

const config = {
  connectConfig,
};

export = config;
