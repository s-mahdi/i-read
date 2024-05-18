import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt.config';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { VersesModule } from '../verses/verses.module';
import { Verse } from '../verses/entities/verse.entity';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from '../proxy/proxy.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '.env'),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Verse],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    AuthModule,
    VersesModule,
    HttpModule,
    JwtModule.register(jwtConstants),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'api', 'assets', 'audio'),
      serveRoot: '/api/audio',
    }),
  ],
  controllers: [AppController, ProxyController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
