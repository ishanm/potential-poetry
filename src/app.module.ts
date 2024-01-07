import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PoemsController } from './poems/poems.controller';
import { PoemsService } from './poems/poems.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, PoemsController, UsersController],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    PoemsService,
    UsersService,
  ],
})
export class AppModule {}
