import { Module } from '@nestjs/common';
import { StatisticsService } from './issue.statistics.service';
import { StatisticsController } from './issue.statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from '../issues.entity';
import { Status } from '../../status/status.entity';
import { IssuesService } from '../issues.service';
import { UtilsModule } from 'src/utils/utils.module';
import { UsersModule } from 'src/users/users.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    UtilsModule,
    UsersModule,
    FilesModule,
    TypeOrmModule.forFeature([Issue, Status]),
  ],
  providers: [StatisticsService, IssuesService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
