import { AuthModule } from './../auth/auth.module';
import { CoreModule } from './../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from './../data/entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CoreModule, AuthModule],
  providers: [],
  exports: [],
  controllers: [UsersController],
})
export class UsersModule {}
