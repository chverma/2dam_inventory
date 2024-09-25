import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StatusModule } from './status/status.module';
import { ClassroomModule } from './classroom/classroom.module';
import { InventariModule } from './inventari/inventari.module';
import { InventariTypeModule } from './inventari_type/inventari_type.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [
    ClassroomModule,
    InventariTypeModule,
    IssuesModule,
    UsersModule,
    StatusModule,
    InventariModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
