import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { PrismaService } from './prisma.service';
import { PoemsController } from './poems/poems.controller';
import { PoemsService } from './poems/poems.service';

@Module({
  imports: [],
  controllers: [AppController, PoemsController],
  providers: [AppService, UserService, PrismaService, PoemsService],
})
export class AppModule {}
