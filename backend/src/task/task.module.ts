import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
