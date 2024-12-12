import { forwardRef, Module } from '@nestjs/common';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from './issues.entity';
import { StatisticsModule } from './statistics/statistics.module'; // Importamos el StatisticsModule
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([Issue]),
    StatisticsModule,
    forwardRef(() => FilesModule),
    UsersModule,
  ],
  exports: [TypeOrmModule, IssuesService],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
