import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   // Serve from project root's `public` folder
    //   rootPath: join(process.cwd(), 'public'),
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'nest_db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProfileModule,
  ],
})
export class AppModule {}