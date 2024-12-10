import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskController } from './task.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [TaskResolver, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
