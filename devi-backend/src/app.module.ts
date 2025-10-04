import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppsModule } from './apps/apps.module';
import { OtpsModule } from './otps/otps.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123456',
      database: 'devi',
      autoLoadEntities: true, // automatically load entities (avoid to specify them manually)
      synchronize: true, /// only for development (avoid in production) this able to update the database schema automatically
    }),
    AppsModule,
    OtpsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
