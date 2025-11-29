import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsModule } from './apps/apps.module';
import { OtpsModule } from './otps/otps.module';
import { StagesModule } from './stages/stages.module';
import { TasksModule } from './tasks/tasks.module';
import { DockerModule } from './docker/docker.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'devi',
      autoLoadEntities: true, // automatically load entities (avoid to specify them manually)
      synchronize: true, /// only for development (avoid in production) this able to update the database schema automatically
    }),
    AppsModule,
    OtpsModule,
    StagesModule,
    TasksModule,
    DockerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
