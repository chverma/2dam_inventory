import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Inventari } from './inventari/inventari.entity';
import { InevntariSeeder } from './db/seeding/seeds/inventariSeed';
import { Inventari_type } from './inventari_type/inventari_type.entity';
import { Issue } from './issues/issues.entity';
import { IssueConversationEntity } from './issues_conversation/issues_conversation.entity';
import { User } from './users/users.entity';
import { Status } from './status/status.entity';
import { Classroom } from './classroom/classroom.entity';
import { UserSeeder } from './db/seeding/seeds/users.seeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'mariadb',
  host: 'database',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  entities: [
    Inventari,
    Inventari_type,
    Issue,
    IssueConversationEntity,
    User,
    Status,
    Classroom,
  ],
  seeds: [InevntariSeeder, UserSeeder],
};

const dataSource = new DataSource(options);

dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
  })
  .catch((error) => console.log('Error initializing data source', error));
